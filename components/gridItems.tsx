import {
  AntDesign,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    paddingTop: 25,
    width: 100,
    paddingLeft: "40%",
  },
});

export const menuItems = [
  {
    name: "BUY GOODS",
    code: "#1abc9c",
    icon: (
      <MaterialIcons
        name="add-shopping-cart"
        size={40}
        color="white"
        style={styles.icon}
      />
    ),
  },
  {
    name: "SEND COUPON",
    code: "#2ecc71",
    icon: (
      <Ionicons
        name="ios-share-outline"
        size={40}
        color="white"
        style={styles.icon}
      />
    ),
  },
  {
    name: "DEPOSIT",
    code: "#3498db",
    icon: (
      <AntDesign name="download" size={40} color="white" style={styles.icon} />
    ),
  },
  {
    name: "WITHDRAW",
    code: "#9b59b6",
    icon: (
      <Ionicons
        name="cash-outline"
        size={40}
        color="white"
        style={styles.icon}
      />
    ),
  },
];
