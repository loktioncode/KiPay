import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerificationScreen from "./screens/VerificationScreen";
import ResetPasswordScreen from "./screens/ResetScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";

import UserProvider from "./context/UserContext";

const Drawer = createDrawerNavigator();
export default function App() {
  const CustomDrawerContent = (props: any) => {
    const { state, ...rest } = props;
    const newState = { ...state };
    newState.routes = newState.routes.filter(
      (item: any) => item.name === "LoginScreen"
    );

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList state={newState} {...rest} />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      <UserProvider>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
          }}
        >
          <Drawer.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: "Login" }}
          />

          <Drawer.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: "Register User" }}
          />

          <Drawer.Screen
            name="VerificationScreen"
            component={VerificationScreen}
            options={{ title: "Verify OTP" }}
          />

          <Drawer.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{ title: " Reset Password " }}
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
