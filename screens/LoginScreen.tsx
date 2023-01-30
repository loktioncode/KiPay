import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
// import piggyLogo from "../assets/piggy.svg";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-root-toast";
// You can import from local files
import Input from "../components/Input";
import Form from "../components/Form";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";
import validation from "../config/validations";
import { UserContextType, IUser } from "../types/user";
import axios from "axios";
import { Storage } from "expo-storage";

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = ({ navigation }) => {
  const { user, saveUser } = React.useContext(UserContext) as UserContextType;
  const [loading, setLoading] = React.useState(false);

  const login = async (username: string, password: string) => {
    const token = JSON.parse(await Storage.getItem({ key: "userInfo" }));
    axios
      .post(
        `http://example.com/api/auth`,
        {
          username,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        saveUser(userInfo);
        Storage.setItem({
          key: "userInfo",
          value: JSON.stringify(userInfo),
        });
        setLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setLoading(false);
      });
  };

  const onLoginPressed = async (data: any) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await login(data.username, data.password);
      console.log(response);
    } catch (e: any) {
      alert("Oops, Failed to Login");
    }
    setLoading(false);
  };

  const { handleSubmit, register, setValue, errors, getValues } =
    useForm<FormData>();

  let toast = Toast.show("Request sent!", {
    duration: Toast.durations.LONG,
  });

  const onSubmit = (data: FormData) => {
    // Alert.alert("data", JSON.stringify(data));
    // <Toast visible={this.state.visible}>Thanks for subscribing!</Toast>
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 500);
    navigation.navigate("HomeScreen");
  };

  let Logo = require("../assets/logo.png");

  return (
    <ScrollView style={styles.main}>
      <View style={styles.logo}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.container}>
        <Form {...{ register, setValue, validation, errors }}>
          <Input name="phone" label="Phone Number" keyboardType={"numeric"} />
          <Input name="password" label="Password" secureTextEntry={true} />

          <Button onPress={handleSubmit(onSubmit)} variant="" title="LOGIN" />
        </Form>

        <Button
          onPress={() => navigation.navigate("RegisterScreen")}
          variant="outlined"
          title="REGISTER"
        />

        <Button
          onPress={() =>
            navigation.navigate("VerificationScreen", {
              email: getValues("email"),
            })
          }
          variant="text"
          title="Forgot Password ?"
        />
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
    borderColor: "#2c3e50",
    width: "90%",
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 25,
  },
});

export default LoginScreen;
