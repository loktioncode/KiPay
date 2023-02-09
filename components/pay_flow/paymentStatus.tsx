import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Button from "../Button";

const PaymentStatus = (props: any) => {
  let depositIcon = require("../../assets/deposit.png");

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={depositIcon} style={{ width: 80, height: 80 }} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.paragraph}>Invoice Number:</Text>
        <Text style={styles.title}>{props.invoice}</Text>

        <Text style={styles.paragraph}>Amount to be paid:</Text>
        <Text style={styles.title}>USDC {props.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 25,
    textAlign: "center",
    marginTop: 0,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "30%",
    objectFit: "fill",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  paragraph: {
    margin: 4,
    marginTop: 0,
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
    color: "#2c3e50",
  },
});

export default PaymentStatus;
