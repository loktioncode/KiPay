import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
const Stack = createStackNavigator();

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerificationScreen from "./screens/VerificationScreen";
import ResetPasswordScreen from "./screens/ResetScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";

const Drawer = createDrawerNavigator();
export default function App() {
  const CustomDrawerContent = (props: any) => {
    const { state, ...rest } = props;
    const newState = { ...state };
    newState.routes = newState.routes.filter(
      (item: any) =>
        item.name !== "LoginScreen" &&
        item.name !== "ResetPasswordScreen" &&
        item.name !== "VerificationScreen" &&
        item.name !== "RegisterScreen"
    );

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList state={newState} {...rest} />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ title: "Register User" }}
        />

        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
          options={{ title: "Verify OTP" }}
        />

        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{ title: " Reset Password " }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ title: "Dashboard" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
