import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Modal,
  Pressable,
} from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
import Button from "../components/Button";
import Input from "../components/Input";
import Form from "../components/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Storage } from "expo-storage";
import validation from "../config/validations";
import uuid from "react-native-uuid";
import * as Network from "expo-network";
import DropDownPicker from "react-native-dropdown-picker";
import countries from "./countries";
import CreditCard from "../components/creditcard";

type FormData = {
  name: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  district: string;
  postalcode: string;
};

const AddCard = ({ route, navigation }) => {
  const { total_cost, paid, id } = route.params;
  const [cardData, setCardData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("");

  const [modalVisible, setModalVisible] = React.useState(false);
  const [hide, setHide] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  const [open, setOpen] = useState(false);
  const [value, setSelectValue] = useState(null);
  const [items, setItems] = useState(countries);

  let uId = uuid.v4();

  const getTotal = (qty: any, price: number) => setTotal(price * parseInt(qty));

  const { handleSubmit, register, setValue, errors, getValues } =
    useForm<FormData>();

  const getKey = async () => {
    const item = await Storage.getItem({ key: `pciKey` });
    return item;
  };

  const getCard = async () => {
    const item = await Storage.getItem({ key: "card" });
    return item;
  };

  const pay = async (data: any) => {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://kichain-server.onrender.com/pay",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response: { data: any }) {
        setLoading(!loading);
        console.log("PAID", JSON.stringify(response.data));
        navigation.navigate("PayScreen", response.data);
      })
      .catch(function (error: any) {
        alert("FAILED TO PAY");
        setLoading(!loading);
      });
  };

  const addCard = async (payload: any) => {
    let ip = await Network.getIpAddressAsync();
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://kichain-server.onrender.com/add-card",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    console.log(payload);

    axios(config)
      .then(function (response) {
        Storage.setItem({
          key: "card",
          value: response.data.id,
        });
        let data = JSON.stringify({
          idempotencyKey: uId,
          amount: {
            amount: total_cost,
            currency: "USD",
          },
          verification: "cvv",
          source: {
            id: response.data.id,
            type: "card",
          },
          description: "",
          channel: "",
          metadata: {
            email: "satoshi@circle.com",
            phoneNumber: "+14155555555",
            sessionId: uId,
            ipAddress: ip,
          },
        });
        if (paid) {
          alert("INVOICE PAID");
        } else {
          pay(data);
        }
      })
      .catch(function (error) {
        alert("FAILED TO ADD CARD");
        setLoading(!loading);
      });
  };

  const secureCardData = async (data: any, billingInfo: FormData) => {
    setLoading(!loading);
    try {
      await axios
        .post("https://kichain-server.onrender.com/card-secure", data)
        .then(async function (res) {
          var cardDataPayload = {
            idempotencyKey: uId,
            encryptedData: res.data.encryptedMessage,
            expMonth: 1,
            expYear: 2025,
            keyId: "key1",
            billingDetails: billingInfo,
            metadata: {
              email: "satoshi@circle.com",
              phoneNumber: "+14155555555",
              sessionId: uId,
              ipAddress: await Network.getIpAddressAsync(),
            },
          };
          addCard(cardDataPayload);
        });
    } catch (error) {
      setLoading(false);
      alert("FAILED TO PROCESS CARD INFO");
    }
  };

  const onChange = (form: any) => {
    setCardData(form);
  };

  const saveCardInfo = async (cardData: any, billingInfo: FormData) => {
    const data = {
      number: cardData?.values?.number.split(" ").join(""),
      cvv: cardData?.values?.cvc,
      pubkey: await getKey(),
    };
    billingInfo.country = countryCode;
    secureCardData(data, billingInfo);
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = (billingInfo: FormData) => {
    saveCardInfo(cardData, billingInfo);
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

  // if (getCard()) {
  //   return (
  //     <CreditCard   name=""
  //     date=""
  //     suffix=""
  //     style={styles.centeredView}
  //     textColor = "white"
  //     bgColor = "#0047cc"/>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalText}>Confirm</Text>
            </View>

            <View>
              {route?.params?.action === "send" ? (
                <Text style={styles.paragraph}>Amount to be Sent!</Text>
              ) : (
                <Text style={styles.paragraph}>
                  {getValues("quantity") + " " + route.params.metric}
                </Text>
              )}

              <Text style={styles.total}>TOTAL: $ {total}</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.main}>
        <CreditCardInput onChange={onChange} autoFocus allowScroll />
        <View style={styles.container}>
          <Form {...{ register, setValue, validation, errors }}>
            <Input name="name" label="Name" />
            <Input name="city" label="City" />

            <View style={styles.container}></View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setSelectValue}
              setItems={setItems}
              placeholder="Select Country"
              searchable={true}
              onChangeValue={(e: any) => setCountryCode(e)}
              dropDownContainerStyle={{
                marginLeft: 2,
                marginRight: "8%",
                padding: 5,
                display: "flex",
              }}
              selectedItemContainerStyle={{
                backgroundColor: "grey",
              }}
              style={{
                borderColor: "#2c3e50",
                width: "90%",
                borderWidth: 2,
                borderRadius: 5,
                marginTop: 2,
                marginBottom: 10,
                marginLeft: "5%",
                padding: 15,
              }}
            />

            <Input name="line1" label="Address" />
            <Input name="district" label="District" />
            <Input name="postalCode" label="Postal Code" />
            <Button
              onPress={handleSubmit(onSubmit)}
              variant=""
              title="SUBMIT"
              load={loading}
             
            />
          </Form>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "#2c3e50",
    textTransform: "capitalize",
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    marginTop: 0,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textTransform: "capitalize",
  },
  total: {
    margin: 24,
    marginTop: 10,
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: "#2c3e50",
    textTransform: "capitalize",
  },
});

export default AddCard;
