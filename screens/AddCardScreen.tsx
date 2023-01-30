import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import Button from "../components/Button";
import Input from "../components/Input";
import Form from "../components/Form";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Storage } from "expo-storage";
import validation from "../config/validations";

type FormData = {
  email: string;
  password: string;
};

const AddCard = ({ route, navigation }) => {
  const { total_cost } = route.params;
  const [cardData, setCardData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [next, setNext] = React.useState(false);

  const onChange = (form: any) => setCardData(form);
  const saveCardInfo = () => setNext(!next);

  const getKey = async () => {
    const item = JSON.parse(await Storage.getItem({ key: `pciKey` }));
    console.log(item)
  };

  const { handleSubmit, register, setValue, errors, getValues } =
    useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert("data");
  };

  // Storage.setItem({
  //   key: "billing",
  //   value: JSON.stringify(userInfo),
  // });

  return (
    <ScrollView style={styles.main}>
      {!next ? (
        <CreditCardInput onChange={onChange} autoFocus allowScroll />
      ) : (
        <View style={styles.container}>
          <Form {...{ register, setValue, validation, errors }}>
            <Input name="phone" label="Phone Number" keyboardType={"numeric"} />
            <Input name="password" label="Password" secureTextEntry={true} />

            <Button onPress={handleSubmit(onSubmit)} variant="" title="LOGIN" />
          </Form>
        </View>
      )}

      <View style={styles.button}>
        {cardData && !next ? (
          <Button
            onPress={() => saveCardInfo()}
            variant="outlined"
            title="Continue"
          />
        ) : null}
      </View>
    </ScrollView>
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
