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

import validation from "../validations";

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = ({navigation}) => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert("data", JSON.stringify(data));
    console.log(">>>1", data);
  };

  let Logo = require("../assets/logo.png");

  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.container}>
        <Form {...{ register, setValue, validation, errors }}>
          <Input name="email" label="Email" />
          <Input name="password" label="Password" secureTextEntry={true} />

          <Button onPress={handleSubmit(onSubmit)} variant="" title="Login" />
        </Form>

        <Button
          onPress={() => navigation.navigate("RegisterScreen")}
          variant="outlined"
          title="Register"
        />

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

export default LoginScreen;
