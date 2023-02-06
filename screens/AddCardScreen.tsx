import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import iso3311a2 from "iso-3166-1-alpha-2";
import DropDownPicker from "react-native-dropdown-picker";
import countries from "./countries";

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
  const { total_cost } = route.params;
  const [cardData, setCardData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("");

  // const countries_object = iso3311a2.getData();

  // const countries = Object.entries(countries_object).map(([value, label]) => ({
  //   value,
  //   label,
  // }));

  const [open, setOpen] = useState(false);
  const [value, setSelectValue] = useState(null);
  const [items, setItems] = useState(countries);

  let uId = uuid.v4();

  const { handleSubmit, register, setValue, errors, getValues } =
    useForm<FormData>();

  const getKey = async () => {
    const item = JSON.parse(await Storage.getItem({ key: `pciKey` }));
    return item;
  };

  const getCardStatus = async (cardId: string) => {
    var data = JSON.stringify({
      id: cardId,
    });

    console.log(">>ID", data);

    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://kichain-server.onrender.com/get-card",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addCard = async (payload: any) => {
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
        getCardStatus(response.data.id);
        Storage.setItem({
          key: "card",
          value: response.data.id
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const secureCardData = async (data: any, billingInfo: FormData) => {
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
      alert(error.Error);
    }
  };

  const onChange = (form: any) => {
    setCardData(form);
  };

  const saveCardInfo = async (cardData: any, billingInfo: FormData) => {
    setLoading(!loading);
    const data = {
      number: cardData?.values?.number.split(" ").join(""),
      cvv: cardData?.values?.cvc,
      pubkey: await getKey(),
    };
    billingInfo.country = countryCode;
    secureCardData(data, billingInfo);
  };

  const onSubmit = (billingInfo: FormData) => {
    saveCardInfo(cardData, billingInfo);
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
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
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
});

export default AddCard;
