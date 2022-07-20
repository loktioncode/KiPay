import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
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

  return (
    <View style={styles.container}>
      <Image source={piggyLogo} style={styles.logo} />
      <Text>TEST APP</Text>

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
          />
        )}
        name="lastName"
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
    width: 300,
    height: 150,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input:{
    borderColor: "black",
    width: 280,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  }
});
