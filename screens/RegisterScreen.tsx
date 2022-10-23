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
import validation from "../validations";
import Button from "../components/Button";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterScreen = () => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert("data", JSON.stringify(data));
  };
  let Logo = require("../assets/logo.png");

  return (
    <View style={styles.main}>
      <View style={styles.logo}>
      <Image source={Logo} style={{ width: 80, height: 80 }} />

      <Text style={styles.paragraph}>
          Register new account! 
        </Text>
      </View>
      <View style={styles.container}>
        <Form {...{ register, setValue, validation, errors }}>
          <Input name="name" label="Name " />
          <Input name="email" label="Email" />
          <Input name="password" label="Password" secureTextEntry={true} />
          <Button onPress={handleSubmit(onSubmit)} variant="" title="Submit Details" />
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
    marginTop: 0,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 35,
  },
  input: {
    borderColor: "black",
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
    backgroundColor: "#000",
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
    borderColor: "black",
    borderWidth: 1,
  },
});

export default RegisterScreen;
