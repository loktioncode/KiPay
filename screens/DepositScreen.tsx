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
import { goodsGridItems } from "../components/gridItems";
import Input from "../components/Input";
import Form from "../components/Form";
import validation from "../config/validations";
import Button from "../components/Button";
import { labels, customStyles } from "./stepperStyles";
import StepIndicator from "react-native-step-indicator";
import DepositForm from "../components/deposit_flow/depositForm";
import DepositOrder from "../components/deposit_flow/depositOrder";

type FormData = {
  recipient: number;
  amount: number;
};

const DepositScreen = ({ route, navigation }) => {
  const { handleSubmit, register, setValue, errors, getValues, reset } =
    useForm<FormData>();

  const [data, purchaseData] = React.useState<FormData>(null);
  const [currentPosition, setCurrentPosition] = React.useState(0);

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    setCurrentPosition(0);
  }, []);

  const onSubmit = (data: FormData) => {
    // setCurrentPosition(1);
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

  const depositComplete = (
    <View style={styles.infoContainer}>
      <Text style={styles.title}>Deposit Complete!</Text>

      <Text style={styles.paragraph}>2. Confirm order</Text>
      <Text style={styles.paragraph}>
        3. Use order number at TillPoint to deposit
      </Text>

      <Button
        onPress={() => setCurrentPosition(0)}
        variant=""
        title={"Complete"}
      />
    </View>
  );

  const stepperContent = [
    <DepositForm setCurrentPosition={() => setCurrentPosition(1)} />,
    <DepositOrder setCurrentPosition={() => setCurrentPosition(0)} />,
    depositComplete,
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
              <Text style={styles.modalParagraph}>Amount to be Sent!</Text>
              <Text style={styles.modalParagraph}>$ {getValues("amount")}</Text>
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
          // labels={labels}
          stepCount={stepperContent.length}
        />
      </View>

      {stepperContent[currentPosition]}

      {/* {DepositHistoryFlatList} */}
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

export default DepositScreen;
