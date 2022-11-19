import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { SectionGrid } from "react-native-super-grid";
import { goodsGridItems } from "../components/gridItems";

const BuyGoodsScreen = ({ navigation }) => {
  const [items, setItems] = React.useState(goodsGridItems);
  let Logo = require("../assets/logozuva.png");
  return (
    <SectionGrid
      itemDimension={95}
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
        <TouchableOpacity
          // style={[styles.itemContainer, { backgroundColor: item.code }]}
          style={[styles.itemContainer]}
          onPress={() =>
            navigation.navigate("PurchaseScreen", {
              item: item.name,
              image: item.logoUrl,
              metric: item.metric
            })
          }
        >
          <View style={styles.logo}>
            <Image source={item.logoUrl} style={{ width: 130, height: 70 }} />

            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{''}</Text>
          </View>
        </TouchableOpacity>
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
    paddingBottom: 10,
    height: 130,
    borderColor: "#2c3e50",
    borderWidth: 1,
    borderStyle: "solid",
  },
  itemName: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "700",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#2c3e50",
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#2980b9",
    color: "white",
    padding: 10,
  },
  logo: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default BuyGoodsScreen;
