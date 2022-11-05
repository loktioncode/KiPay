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
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import { MaterialIcons, SimpleLineIcons, Fontisto } from "@expo/vector-icons";


const HomeScreen = ({ navigation }) => {
  const [items, setItems] = React.useState([
    { name: "TURQUOISE", code: "#1abc9c" },
    { name: "EMERALD", code: "#2ecc71" },
    { name: "PETER RIVER", code: "#3498db" },
    { name: "AMETHYST", code: "#9b59b6" },
    { name: "WET ASPHALT", code: "#34495e" },
    { name: "GREEN SEA", code: "#16a085" },
    { name: "NEPHRITIS", code: "#27ae60" },
    { name: "BELIZE HOLE", code: "#2980b9" },
    { name: "WISTERIA", code: "#8e44ad" },
    { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    { name: "SUN FLOWER", code: "#f1c40f" },
    { name: "CARROT", code: "#e67e22" },
    { name: "ALIZARIN", code: "#e74c3c" },
    { name: "CLOUDS", code: "#ecf0f1" },
    { name: "CONCRETE", code: "#95a5a6" },
    { name: "ORANGE", code: "#f39c12" },
    { name: "PUMPKIN", code: "#d35400" },
    { name: "POMEGRANATE", code: "#c0392b" },
    { name: "SILVER", code: "#bdc3c7" },
    { name: "ASBESTOS", code: "#7f8c8d" },
  ]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.head}>
          <Text style={styles.paragraph}>Welcome to our Home Screen</Text>
          <View
            style={{
              flexDirection: "row",
              height: 100,
              padding: 20,
              justifyContent: "space-evenly",
              
            }}
          >
            <MaterialIcons name="qr-code-scanner" size={50} color="white" />
            <SimpleLineIcons name="wallet" size={50} color="white" />
            <Fontisto name="ticket" size={50} color="white" />
          </View>
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
              <View
                style={[styles.itemContainer, { backgroundColor: item.code }]}
              >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.code}</Text>
              </View>
            )}
          />
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
          >
            <Text>Open Drawer</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: "pink",
    marginHorizontal: 20,
  },
  griContainer: {
    display: "flex",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  head: {
    backgroundColor: "red",
    textAlign: "center",
    height: "14%",
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  gridView: {
    marginTop: -40,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    paddingBottom: 50,
  },
});

export default HomeScreen;
