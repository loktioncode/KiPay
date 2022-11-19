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

export const goodsGridItems = [
  { name: 'BUY PETROL', code: '#1abc9c', logoUrl: require("../assets/logozuva.png")},
  // { name: 'EMERALD', code: '#2ecc71' },
  // { name: 'PETER RIVER', code: '#3498db' },
  // { name: 'AMETHYST', code: '#9b59b6' },
  // { name: 'WET ASPHALT', code: '#34495e' },
  // { name: 'GREEN SEA', code: '#16a085' },
  // { name: 'NEPHRITIS', code: '#27ae60' },
  // { name: 'BELIZE HOLE', code: '#2980b9' },
  // { name: 'WISTERIA', code: '#8e44ad' },
  // { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
  // { name: 'SUN FLOWER', code: '#f1c40f' },
  // { name: 'CARROT', code: '#e67e22' },
  // { name: 'ALIZARIN', code: '#e74c3c' },
  // { name: 'CLOUDS', code: '#ecf0f1' },
  // { name: 'CONCRETE', code: '#95a5a6' },
  // { name: 'ORANGE', code: '#f39c12' },
  // { name: 'PUMPKIN', code: '#d35400' },
  // { name: 'POMEGRANATE', code: '#c0392b' },
  // { name: 'SILVER', code: '#bdc3c7' },
  // { name: 'ASBESTOS', code: '#7f8c8d' },
]
