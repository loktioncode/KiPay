import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import Button from "../components/Button";
import uuid from "react-native-uuid";

const PayScreen = ({ route, navigation }) => {
  const { invoiceId, id, amount, shop_owner, fees } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [shop_eth_wallet, setEthWallet] = React.useState("");
  let uId = uuid.v4();

  let Logo = require("../assets/logozuva.png");

  const payShop = (wallet: string) => {
    let payload = JSON.stringify({
      source: {
        type: "wallet",
        id: "1001044978",
      },
      destination: {
        type: "blockchain",
        address: wallet,
        chain: "ETH",
      },
      amount: {
        amount: amount.amount,
        currency: "USD",
      },
      idempotencyKey: uId,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://kichain-server.onrender.com/eth-txn",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    console.log(">>",payload);

    axios(config)
      .then(function (response: { data: any }) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      })
      .catch(function (error: any) {
        setLoading(false);
      });
  };

  const getShopWallet = (email: string) => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://kichain-server.onrender.com/get-wallet?email=${email}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        let wallet = response.data.walletAddress;
        if (wallet !== null) {
          console.log(wallet);
          payShop(wallet);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateInvoice = () => {
    setLoading(true);
    var data = JSON.stringify({
      paid: true,
    });

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://kichain-server.onrender.com/payment/${invoiceId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        getShopWallet(shop_owner);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    updateInvoice();
  }, []);

  return (
    <ScrollView style={styles.main}>
      <View style={styles.infoContainer}>
        <Feather name="check-circle" size={100} color="#2c3e50" />
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Text style={styles.title}>USDC {amount.amount} PAID ! </Text>
        </View>
        <View style={{ paddingTop: 1, paddingBottom: 30 }}>
          {/* <Text style={styles.paragraph}>USDC {fees.amount} Sent!</Text> */}
        </View>

        <Button
          onPress={() => !loading && navigation.navigate("HomeScreen")}
          variant=""
          title={"Next"}
          load={loading}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.balance}>KiPAY</Text>

        <Text style={styles.title}>
          FEE CHARGED{parseInt(amount.amount) * 0.03}{" "}
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
