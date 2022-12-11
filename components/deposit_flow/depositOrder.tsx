import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Button from "../Button";

const DepositOrder = (props: any) => {
  let depositIcon = require("../../assets/deposit.png");
  let Logo = require("../../assets/logozuva.png");

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={depositIcon} style={{ width: 80, height: 80 }} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.paragraph}>Order Number:</Text>
        <Text style={styles.title}>#22435ZW</Text>

        <Text style={styles.paragraph}>Deposit Amount:</Text>
        <Text style={styles.title}>$10.50</Text>

        <Image source={Logo} style={{ width: 200, height: 80 }} />
        <Text style={styles.paragraph}>
          1. Enter amount you want to deposit!
        </Text>
        <Text style={styles.paragraph}>2. Confirm order</Text>
        <Text style={styles.paragraph}>
          3. Use order number at TillPoint to deposit
        </Text>
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
