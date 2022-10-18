import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  Label,
  TouchableOpacity,
} from "react-native";
import piggyLogo from "./assets/logo.png";
import { useForm, Controller } from "react-hook-form";

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  const onChange = (data) => console.log(data);

  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Image source={piggyLogo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Email/Phone Number"
            />
          )}
          name="firstName"
        />
        {errors.firstName && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Passsword"
              secureTextEntry
            />
          )}
          name="lastName"
        />
        <TouchableOpacity
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          style={styles.btn}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <Button
          title="Sign Up"
         
   
        />

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

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
    padding: 10,
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: "red",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 5,
    color: "white",
  },
});
