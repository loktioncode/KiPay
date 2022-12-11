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

const ActionsScreen = ({ route, navigation }) => {
  const { handleSubmit, register, setValue, errors, getValues, reset } =
    useForm<FormData>();

  const [data, purchaseData] = React.useState<FormData>(null);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [hide, setHide] = React.useState(false);
  const [total, setTotal] = React.useState(0);

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

  const getTotal = (qty: any, price: number) => setTotal(price * parseInt(qty));

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

            <View>
              {route?.params?.action === "send" ? (
                <Text style={styles.paragraph}>
                  Amount to be Sent!
                </Text>
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

      {!hide ? (
        <View style={styles.logo}>
          <Image
            source={route.params.image}
            style={{ width: 200, height: 100 }}
          />
        </View>
      ) : (
        <View></View>
      )}
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {route?.params?.action === "send"
            ? "Send Coupon"
            : `BUY ` + route.params.item}
        </Text>
        <Form {...{ register, setValue, validation, errors }}>
          {route?.params?.action === "send" ? (
            <>
              <Input
                name="recipient"
                label="Recipient Contact"
                blurOnSubmit
                keyboardType={"numeric"}
                defaultValue=""
              />
              <Input
                name="amount"
                label={`Amount`}
                keyboardType={"numeric"}
                blurOnSubmit
                defaultValue=""
              />
            </>
          ) : (
            <>
              <Input
                name="merchant"
                label="Merchant"
                blurOnSubmit
                keyboardType={"numeric"}
                defaultValue=""
              />
              <Input
                name="quantity"
                label={`Quantity: ${route.params.metric}`}
                keyboardType={"numeric"}
                blurOnSubmit
                onFocus={hide ? () => setHide(false) : () => setHide(true)}
                onChange={() => getTotal(getValues("quantity"), 2)}
                defaultValue=""
              />
            </>
          )}

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

export default ActionsScreen;
