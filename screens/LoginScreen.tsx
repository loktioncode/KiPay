import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Constants from "expo-constants";
import { useForm } from "react-hook-form";

// You can import from local files
import Input from "../components/Input";
import Form from "../components/Form";
import validation from "../validations";
import Hero from "../components/Hero";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const LoginScreen = () => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert("data", JSON.stringify(data));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: "#181e34" }}
    >
      <Hero />
      <View style={styles.formContainer}>
        <Form {...{ register, setValue, validation, errors }}>
          <Input name="name" label="Name " />
          <Input name="email" label="Email" />
          <Input name="password" label="Password" secureTextEntry={true} />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </Form>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "30%",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#181e34',
  },
  formContainer: {
    padding: 8,
    flex: 1,
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

export default LoginScreen;
