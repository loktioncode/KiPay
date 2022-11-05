import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = (props: any) => {
  const { onPress, title, variant } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={variant === "outlined" ? styles.outlinedBtn : variant === "text" ? styles.textButton : styles.button}
    >
      <Text
        style={
          variant === "outlined" ? styles.outlinedButtonText : variant === "text" ? styles.textButtonText :  styles.btnTxt
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    marginTop: "2%",
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
  textButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 38,
    elevation: 3,
    backgroundColor: "#fff",
    marginTop: 10
  },
  textButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "#2c3e50"
  },
});

export default Button;
