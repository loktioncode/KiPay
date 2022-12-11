import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  Modal,
  Pressable,
} from "react-native";

import { useForm, Controller } from "react-hook-form";

// You can import from local files
import Input from "../components/Input";
import Form from "../components/Form";
import validation from "../config/validations";
import Button from "../components/Button";

type FormData = {
  merchant: string;
  quantity: number;
  recipient: number;
  amount: number;
};

const WithdrawScreen = ({ route, navigation }) => {
  const { handleSubmit, register, setValue, errors, getValues, reset } =
    useForm<FormData>();

  const [data, purchaseData] = React.useState<FormData>(null);

  const [modalVisible, setModalVisible] = React.useState(false);

  const onSubmit = (data: FormData) => {
    setModalVisible(true);
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
    <ScrollView style={styles.main}>
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

            <Text style={styles.paragraph}>Amount to be Sent!</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <Text style={styles.paragraph}>WITHDRAW</Text>
        <Form {...{ register, setValue, validation, errors }}>
          <Input
            name="merchant"
            label="Merchant"
            blurOnSubmit
            keyboardType={"numeric"}
            defaultValue=""
          />
          <Input
            name="quantity"
            label={`Quantity:`}
            keyboardType={"numeric"}
            blurOnSubmit
            defaultValue=""
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            variant=""
            title={route?.params?.action === "send" ? "SEND" : "BUY"}
          />
        </Form>
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
  total: {
    margin: 24,
    marginTop: 10,
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: "#2c3e50",
    textTransform: "capitalize",
  },
  logo: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "25%",
    objectFit: "fill",
    backgroundColor: "#fff",
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
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
});

export default WithdrawScreen;