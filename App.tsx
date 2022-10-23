import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerificationScreen from "./screens/VerificationScreen";
import ResetPasswordScreen from "./screens/ResetScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          options={{ title: "HomeScreen" }}
        />

        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ title: "Dashboard" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
