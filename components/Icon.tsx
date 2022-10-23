import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default ({ name, size, color, onPress }) => {
  return (
    <View style={styles.icon}>
      <Ionicons name={name} size={size} color={color} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
});
