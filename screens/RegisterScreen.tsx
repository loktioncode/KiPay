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

const RegisterScreen = ({ navigation }) => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert("data", JSON.stringify(data));
    navigation.navigate("VerificationScreen");
  };

  let Logo = require("../assets/logo.png");

  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Image source={Logo} style={{ width: 70, height: 70 }} />

        <Text style={styles.paragraph}>Registration</Text>
      </View>
      <View style={styles.container}>
        <Form {...{ register, setValue, validation, errors }}>
          <Input name="name" label="Name " />
          <Input name="phone" label="Phone Number" />
          <Input name="email" label="Email Address" />

          <Input name="password" label="Password" secureTextEntry={true} />
          <Button
            onPress={handleSubmit(onSubmit)}
            variant=""
            title="SUBMIT"
          />
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
  logo: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "20%",
    backgroundColor: "#fff",
  },
  paragraph: {
    margin: 24,
    marginTop:10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#151922",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 35,
  },
  input: {
    borderColor: "#151922",
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
    backgroundColor: "#151922",
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
    borderColor: "#151922",
    borderWidth: 1,
  },
});

export default RegisterScreen;
