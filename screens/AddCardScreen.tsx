import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreditCardInput } from "react-native-credit-card-input";
import Button from "../components/Button";
import Input from "../components/Input";
import Form from "../components/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
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
  const { total_cost, paid, _id } = route.params;
  const [cardData, setCardData] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("");
  const [getKey, setPCIKey] = React.useState(null);
  const [card, setCard] = React.useState("");

  const [open, setOpen] = useState(false);
  const [value, setSelectValue] = useState(null);
  const [items, setItems] = useState(countries);

  let uId = uuid.v4();

  const { handleSubmit, register, setValue, errors, getValues, reset } =
    useForm<FormData>();

  const removeCard = () => {
    AsyncStorage.removeItem("card")
      .then((value) => {
        setCard("");
      })
      .catch((error) => {
        console.log(`Error retrieving string: ${error}`);
      });
  };

  const storeCard = (cardId: string) => {
    AsyncStorage.setItem("card", cardId)
      .then(() => {
        setCard(cardId);
        console.log("Card saved successfully!");
      })
      .catch((error) => {
        console.log(`Error saving string: ${error}`);
      });
  };

  const getCard = async () => {
    AsyncStorage.getItem("card").then((item) => {
      reset();
      console.log("saved card>>", card);
    });
  };

  React.useEffect(() => {
    setLoading(false);
  });

  React.useEffect(() => {
    getCard();
  }, [card]);

  const updateInvoiceStatus = (id: any, data: any) => {
    fetch(`https://kichain-server.onrender.com/get-payment/${id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "confirmed") {
          console.log(">>>exist paid");
          navigation.navigate("PayScreen", data);
        }
      });
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
      .then(async function (response: { data: any }) {
        let x = response.data;
        x.invoiceId = _id;
        updateInvoiceStatus(response.data.id, x);
      })
      .catch(function (error: any) {
        alert("FAILED TO PAY");
        setLoading(false);
      });
  };

  const existingCardPay = async (cardId: string) => {
    let ip = await Network.getIpAddressAsync();

    let paymentData = JSON.stringify({
      idempotencyKey: uId,
      amount: {
        amount: total_cost,
        currency: "USD",
      },
      verification: "none",
      source: {
        id: card,
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
      setLoading(false);
    } else {
      pay(paymentData);
    }
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

    axios(config)
      .then(function (response) {
        let data = JSON.stringify({
          idempotencyKey: uId,
          amount: {
            amount: total_cost,
            currency: "USD",
          },
          verification: "none",
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
        } else if (route.params === null) {
          storeCard(response.data.id);
        } else {
          pay(data);
          storeCard(response.data.id);
        }
      })
      .catch(function (error) {
        alert("FAILED TO ADD CARD");
        setLoading(false);
      });
  };

  const secureCardData = async (data: any, billingInfo: FormData) => {
    let ip = await Network.getIpAddressAsync();

    try {
      setLoading(!loading);
      await axios
        .post("https://kichain-server.onrender.com/card-secure", data)
        .then(function (res) {
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
              ipAddress: ip,
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

  const saveCardInfo = (cardData: any, billingInfo: FormData) => {
    const data = {
      number: cardData?.values?.number.split(" ").join(""),
      cvv: cardData?.values?.cvc,
      pubkey: getKey,
    };
    billingInfo.country = countryCode;
    secureCardData(data, billingInfo);
  };

  React.useEffect(() => {
    setLoading(false);
    try {
      axios
        .get("https://kichain-server.onrender.com/getencryptionkey")
        .then(function (res) {
          setPCIKey(res.data);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const onSubmit = (billingInfo: FormData) => {
    saveCardInfo(cardData, billingInfo);
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

  if (card !== "" && card !== null && route.params === null) {
    return (
      <View style={styles.centeredView}>
        <View style={{ marginBottom: 25 }}>
          <CreditCard name="**** ****" suffix={"XXX"} date="****" />
        </View>
        <Button
          onPress={existingCardPay}
          variant=""
          title="PAY"
          // load={loading}
        />
        <Button
          onPress={removeCard}
          variant="text"
          title="click to add new card?"
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView style={styles.main}>
        <CreditCardInput onChange={onChange} allowScroll />

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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFFF",
    height: "100%",
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
