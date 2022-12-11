import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Button from "../Button";

const DepositOrder = (props: any) => {
  let depositIcon = require("../../assets/deposit.png");

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={depositIcon} style={{ width: 80, height: 80 }} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.paragraph}>Withdrawal Cuopon Code:</Text>
        <Text style={styles.title}>#22435ZW</Text>

        <Text style={styles.paragraph}>Withdrawal Amount:</Text>
        <Text style={styles.title}>$10.50</Text>
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

export default DepositOrder;
