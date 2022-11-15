import * as React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { FlatGrid} from "react-native-super-grid";
import {
  AntDesign,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import ListView from "../components/ListView"

const HomeScreen = ({ navigation }) => {
  const [items, setItems] = React.useState([
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
        <AntDesign
          name="download"
          size={40}
          color="white"
          style={styles.icon}
        />
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
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.paragraph}>Welcome Ras! 👋</Text>
        <Text style={styles.balanceText}>TOTAL BALANCE</Text>
        <Text style={styles.balance}>$ 100.02</Text>
      </View>
      <View style={styles.griContainer}>
        <FlatGrid
          itemDimension={130}
          data={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // horizontal
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {}}
              style={[
                styles.itemContainer,
                { backgroundColor: item.code ? item.code : "#" },
              ]}
            >
              {item.icon}

              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}></Text>
            </TouchableOpacity>
          )}
        />
      
      </View>
      <ListView />
    </View>
  );
};

const styles = StyleSheet.create({

  griContainer: {
    display: "flex",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  head: {
    backgroundColor: "#2980b9",
    textAlign: "center",
    height: "30%",
  },
  paragraph: {
    margin: 20,
    marginTop: 25,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  icon: {
    paddingTop:25,
    width: 100,
    paddingLeft: "40%",
  },
  iconText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF",
    paddingTop: 10,
  },
  balanceText: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    color: "#FFF",
  },
  balance: {
    paddingTop: 5,
    fontSize: 48,
    fontWeight: "300",
    textAlign: "center",
    color: "#FFF",
  },
  gridView: {
    // marginTop: -50,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    height: 150,
    shadowColor: "#D3D3D3",
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    paddingTop:20
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    paddingBottom: 40,
  },
});

export default HomeScreen;
