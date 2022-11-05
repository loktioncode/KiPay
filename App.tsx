import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
} from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerificationScreen from "./screens/VerificationScreen";
import ResetPasswordScreen from "./screens/ResetScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import { useWindowDimensions } from "react-native";
import UserProvider from "./context/UserContext";
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
            headerShown: true,
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
            options={({ navigation }) => ({
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "#2c3e50",
              },
              headerTitleStyle: {
                color: "#FFFFFF",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#FFFFFF"}
                  size={30}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: null,
              headerTitle: "Register User",
            })}
          />

          <Drawer.Screen
            name="VerificationScreen"
            component={VerificationScreen}
            options={({ navigation }) => ({
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "#2c3e50",
              },
              headerTitleStyle: {
                color: "#FFFFFF",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#FFFFFF"}
                  size={30}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: null,
              headerTitle: "Verification",
            })}
          />

          <Drawer.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={({ navigation }) => ({
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "#2c3e50",
              },
              headerTitleStyle: {
                color: "#FFFFFF",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#FFFFFF"}
                  size={30}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: null,
              headerTitle: "Reset Password",
            })}
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


