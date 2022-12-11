import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { useForm } from "react-hook-form";
import validation from "../../config/validations";
import Button from "../Button";

import Input from "../Input";
import Form from "../Form";

type FormData = {
  recipient: number;
  amount: number;
};

const DepositForm = (props: any) => {
  let depositIcon = require("../../assets/deposit.png");
  const { handleSubmit, register, setValue, errors, getValues, reset } =
    useForm<FormData>();

  const onSubmit = (data: FormData) => {
    props.setCurrentPosition()
    // setModalVisible(true);
    // reset(
    //   {},
    //   {
    //     errors: false,
    //     dirty: false,
    //     dirtyFields: false,
    //   }
    // );
  };

  return (
    <View style={[styles.container, { paddingBottom: 25 }]}>
      <View style={styles.logo}>
        <Image source={depositIcon} style={{ width: 80, height: 80 }} />
      </View>

      <Form {...{ register, setValue, validation, errors }}>
        <Input
          name="amount"
          label="Withdraw Amount"
          blurOnSubmit
          keyboardType={"numeric"}
          defaultValue=""
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          variant=""
          title={"Withdraw"}
        />
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "45%",
    objectFit: "fill",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 55,
  },
  input: {
    borderColor: "#2c3e50",
    width: "90%",
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 25,
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  outlinedButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },

  outlinedBtn: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    color: "white",
    borderColor: "#2c3e50",
    borderWidth: 1,
  },
});

export default DepositForm;
