import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerificationScreen from "./screens/VerificationScreen";
import ResetPasswordScreen from "./screens/ResetScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import { useWindowDimensions } from "react-native";
import UserProvider from "./context/UserContext";
import Button from "./components/Button";
import CustomIcon from "./components/Icon";

const Drawer = createDrawerNavigator();
const Stack = createDrawerNavigator();

export default function App() {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;

  return (
    <NavigationContainer>
      <UserProvider>
        <Drawer.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            drawerType: isLargeScreen ? "permanent" : "back",
            drawerStyle: isLargeScreen ? null : { width: "100%" },
          }}
        >
          <Drawer.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              title: "Login",
            }}
          />

          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "orange",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#151922"}
                  size={30}
                  onPress={()=>console.log("Register Page")}
                />
              ),
              headerRight: null,
              headerTitle: "Register User",
            }}
          />

          <Drawer.Screen
            name="VerificationScreen"
            component={VerificationScreen}
            options={{
              title: "Verify OTP",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />

          <Drawer.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{
              title: " Reset Password ",
              drawerItemStyle: {
                display: "none",
              },
            }}
          />

          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Home" }}
          />

          <Drawer.Screen
            name="DashboardScreen"
            component={DashboardScreen}
            options={{ title: "Dashboard" }}
          />
        </Drawer.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 20,
  },
});
