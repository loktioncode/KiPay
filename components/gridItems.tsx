import {
  AntDesign,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    paddingTop: 50,
    width: 100,
    paddingLeft: "35%",
  },
});

export const menuItems = [
  {
    name: "PAY FOR GOODS",
    code: "#1abc9c",
    icon: (
      <MaterialIcons
        name="payment"
        size={40}
        color="white"
        style={styles.icon}
      />
    ),
    type: "pay",
  },
  {
    name: "ADD CARDS",
    code: "#2ecc71",
    icon: (
      <Ionicons
        name="add"
        size={40}
        color="white"
        style={styles.icon}
      />
    ),
    type: "add",
  },
  // {
  //   name: "DEPOSIT",
  //   code: "#3498db",
  //   icon: (
  //     <AntDesign name="download" size={40} color="white" style={styles.icon} />
  //   ),
  //   type: "deposit",
  // },
  // {
  //   name: "WITHDRAW",
  //   code: "#9b59b6",
  //   icon: (
  //     <Ionicons
  //       name="cash-outline"
  //       size={40}
  //       color="white"
  //       style={styles.icon}
  //     />
  //   ),
  //   type: "withdraw",
  // },
];

export const goodsGridItems = [
  {
    name: "PETROL",
    code: "#1abc9c",
    logoUrl: require("../assets/logozuva.png"),
    metric: "Litres"
  },
  {
    name: "DIESEL",
    code: "#1abc9c",
    logoUrl: require("../assets/logozuva.png"),
    metric: "Litres"
  },
];
