import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import Button from "../components/Button";
import { customStyles } from "../config/stepperStyles";
import StepIndicator from "react-native-step-indicator";

const PayScreen = ({ route, navigation }) => {
  const { invoiceId, id, amount, status } = route.params;

  let Logo = require("../assets/logozuva.png");

  React.useEffect(() => {
    console.log(">>", status);
  }, []);

  return (
    <ScrollView style={styles.main}>
      <View style={styles.infoContainer}>
        <Feather name="check-circle" size={100} color="#2c3e50" />
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Text style={styles.title}>Payment Complete</Text>
        </View>

        <Button onPress={() => navigation.navigate("HomeScreen")} variant="" title={"Next"} />
      </View>

      <View style={styles.container}>

        <Text style={styles.balance}>KiPAY</Text>

        <Text style={styles.paragraph}>1. Enter amount</Text>
        <Text style={styles.paragraph}>2. Confirm Order</Text>
        <Text style={styles.paragraph}>
          3. Use order number at TillPoint to deposit
        </Text>
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
    height: "45%",
    objectFit: "fill",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  modalParagraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "#2c3e50",
    textTransform: "capitalize",
  },
  paragraph: {
    margin: 4,
    marginTop: 0,
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
    color: "#2c3e50",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  balance: {
    paddingTop: 10,
    paddingBottom: 20,

    fontSize: 48,
    fontWeight: "300",
    textAlign: "center",
    color: "#2c3e50",
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});

export default PayScreen;
