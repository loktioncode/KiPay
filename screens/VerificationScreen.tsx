import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
// import piggyLogo from "../assets/piggy.svg";
import { useForm, Controller } from "react-hook-form";

// You can import from local files
import Input from "../components/Input";
import Form from "../components/Form";
import Button from "../components/Button";

import validation from "../config/validations";

type FormData = {
  email: string;
  password: string;
};

const VerificationScreen = ({ route, navigation }) => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>();
  const { email } = route.params;

  const onSubmit = (data: FormData) => {
    Alert.alert("data", JSON.stringify(data));
    navigation.navigate("HomeScreen");
  };

  let Logo = require("../assets/logo.png");

  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.container}>
        <Form {...{ register, setValue, validation, errors }}>
          {/* {email === undefined ? (
            <Input name="email" label="Email / Phonenumber" />
          ) : (
            <></>
          )} */}
          <Input name="otp" label="Verify OTP" />
          <Button onPress={handleSubmit(onSubmit)} variant="" title="VERIFY" />
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
    height: "30%",
    backgroundColor: "#fff",
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
});

export default VerificationScreen;
