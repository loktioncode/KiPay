import * as React from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to our Home Screen</Text>
      <Text>Checkout screens from the tab below</Text>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
      >
        <Text>Open Drawer</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
});

export default HomeScreen;
