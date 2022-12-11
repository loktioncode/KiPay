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

import Button from "../components/Button";
import { customStyles } from "../config/stepperStyles";
import StepIndicator from "react-native-step-indicator";
import WithdrawForm from "../components/withdraw_flow/depositForm";
import WithdrawOrder from "../components/withdraw_flow/depositOrder";

type FormData = {
  recipient: number;
  amount: number;
};

const WithdrawScreen = ({ route, navigation }) => {
  const labels = ["Withdraw",  "Withdraw Status"];
  const [currentPosition, setCurrentPosition] = React.useState(0);
  let Logo = require("../assets/logozuva.png");

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    setCurrentPosition(0);
  },[]);


  const stepperContent = [
    <WithdrawForm setCurrentPosition={() => setCurrentPosition(1)} />,
    <WithdrawOrder setCurrentPosition={() => setCurrentPosition(0)} />,
  ];

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
              <Text style={styles.modalParagraph}>Amount to be Withdrawn!</Text>
              <Text style={styles.modalParagraph}>$ 10.50</Text>
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
      <View style={{ paddingTop: 10 }}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={stepperContent.length}
        />
      </View>

      {stepperContent[currentPosition]}
      
      <View style={styles.container}>
        <Image source={Logo} style={{ width: 200, height: 80 }} />
        <Text style={styles.paragraph}>
          1. Enter amount you want to withdraw!
        </Text>
        <Text style={styles.paragraph}>
          3. Use Code/QR Code at TillPoint to Withdraw
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

export default WithdrawScreen;
