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
    type: "buy",
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
    type: "send_coupon",
  },
  {
    name: "DEPOSIT",
    code: "#3498db",
    icon: (
      <AntDesign name="download" size={40} color="white" style={styles.icon} />
    ),
    type: "deposit",
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
    type: "withdraw",
  },
];

export const goodsGridItems = [
  {
    name: "BUY PETROL",
    code: "#1abc9c",
    logoUrl: require("../assets/logozuva.png"),
    metric: "Litres"
  },
  {
    name: "BUY DIESEL",
    code: "#1abc9c",
    logoUrl: require("../assets/logozuva.png"),
    metric: "Litres"
  },
  // {
  //   name: "EMERALD",
  //   code: "#2ecc71",
  //   logoUrl: require("../assets/logozw.png"),
  // },
  // {
  //   name: "PETER RIVER",
  //   code: "#3498db",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "AMETHYST",
  //   code: "#9b59b6",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "WET ASPHALT",
  //   code: "#34495e",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "GREEN SEA",
  //   code: "#16a085",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "NEPHRITIS",
  //   code: "#27ae60",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "BELIZE HOLE",
  //   code: "#2980b9",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "WISTERIA",
  //   code: "#8e44ad",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "MIDNIGHT BLUE",
  //   code: "#2c3e50",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "SUN FLOWER",
  //   code: "#f1c40f",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "CARROT",
  //   code: "#e67e22",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "ALIZARIN",
  //   code: "#e74c3c",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "CLOUDS",
  //   code: "#ecf0f1",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "CONCRETE",
  //   code: "#95a5a6",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "ORANGE",
  //   code: "#f39c12",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "PUMPKIN",
  //   code: "#d35400",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "POMEGRANATE",
  //   code: "#c0392b",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "SILVER",
  //   code: "#bdc3c7",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
  // {
  //   name: "ASBESTOS",
  //   code: "#7f8c8d",
  //   logoUrl: require("../assets/logozuva.png"),
  // },
];
