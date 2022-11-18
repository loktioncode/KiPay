import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { SectionGrid } from "react-native-super-grid";
import { goodsGridItems } from "../components/gridItems";

const BuyGoodsScreen = ({ navigation }) => {
  const [items, setItems] = React.useState(goodsGridItems);
  let Logo = require("../assets/logo.png");
  return (
    <SectionGrid
      itemDimension={90}
      sections={[
        {
          title: "Basic Commodities",
          data: items.slice(0, 6),
        },
        {
          title: "Travel & Tourism",
          data: items.slice(6, 12),
        },
        {
          title: "Soft Life",
          data: items.slice(12, 20),
        },
      ]}
      style={styles.gridView}
      renderItem={({ item, section, index }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <View style={styles.logo}>
            <Image source={Logo} style={{ width: 100, height: 70 }} />
            <Text style={styles.itemCode}></Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}></Text>

   
          </View>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 5,
    height: 130,
    borderColor: "#2c3e50",
    borderWidth: 1,
    borderStyle: "solid",
  },
  itemName: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: 10,
  },
  logo: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default BuyGoodsScreen;
