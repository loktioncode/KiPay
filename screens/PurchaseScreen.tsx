import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
// import piggyLogo from "../assets/piggy.svg";
import { useForm, Controller } from "react-hook-form";

// You can import from local files
import Input from "../components/Input";
import Form from "../components/Form";
import validation from "../config/validations";
import Button from "../components/Button";

type FormData = {
  name: string;
  email: string;
  phone: number;
  password: string;
};

const PurchaseScreen = ({ route, navigation }) => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert("buy data", JSON.stringify(data));
  };

  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Image source={route.params.image} style={{ width: 200, height: 100 }} />
      </View>
      <View style={styles.container}>
        <Text style={styles.paragraph}>{route.params.item}</Text>
        <Form {...{ register, setValue, validation, errors }}>
          <Input name="merchant" label="Merchant" />
          <Input name="quantity" label="Quantity" />
          <Text style={styles.total}>TOTAL: $ 23,54</Text>

          <Button onPress={handleSubmit(onSubmit)} variant="" title="BUY" />
        </Form>

        <StatusBar style="auto" />
      </View>
    </View>
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
    height: "18%",
    objectFit: "fill",
    backgroundColor: "#fff",
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 24,
    fontWeight: "bold",
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
  button: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2c3e50",
    marginBottom: "3%",
    marginTop: "7%",
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

export default PurchaseScreen;
