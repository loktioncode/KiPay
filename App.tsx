import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VerificationScreen from "./screens/VerificationScreen";
import ResetPasswordScreen from "./screens/ResetScreen";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/HomeScreen";
import BuyGoodsScreen from "./screens/BuyGoodsScreen";
import ActionsScreen from "./screens/ActionsScreen";
import SendCouponScreen from "./screens/SendCouponScreen";
import DepositScreen from "./screens/DepositScreen";
import WithdrawScreen from "./screens/WithdrawScreen";
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
            drawerStyle: isLargeScreen ? null : { width: "80%" },
          }}
        >
          <Drawer.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              title: "Login",
              drawerItemStyle: {
                display: "none",
              },
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
            options={({ navigation }) => ({
              headerShown: true,

              headerTitleStyle: {
                color: "#34495e",
              },
              headerTitle: "coupons ZW",
              title: "Home",
              headerLeft: null,
              headerRight: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#2c3e50"}
                  size={30}
                  onPress={() => navigation.navigate("HomeScreen")}
                />
              ),
            })}
          />

          <Drawer.Screen
            name="HistoryScreen"
            component={HistoryScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerTitleStyle: {
                color: "#2c3e50",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#2c3e50"}
                  size={30}
                  onPress={() => navigation.navigate("HomeScreen")}
                />
              ),
              headerRight: null,
              title: "History",
            })}
          />

          <Drawer.Screen
            name="BuyGoodsScreen"
            component={BuyGoodsScreen}
            options={({ navigation }) => ({
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerTitleStyle: {
                color: "#FFFFFF",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#2c3e50"}
                  size={30}
                  onPress={() => navigation.navigate("HomeScreen")}
                />
              ),
              headerRight: null,
            })}
          />

          <Drawer.Screen
            name="ActionsScreen"
            component={ActionsScreen}
            options={({ navigation }) => ({
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerTitleStyle: {
                color: "#FFFFFF",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#2c3e50"}
                  size={30}
                  onPress={() => navigation.navigate("BuyGoodsScreen")}
                />
              ),
              headerRight: null,
              title: "",
            })}
          />

          <Drawer.Screen
            name="SendCouponScreen"
            component={SendCouponScreen}
            options={({ navigation }) => ({
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerTitleStyle: {
                color: "#FFFFFF",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#2c3e50"}
                  size={30}
                  onPress={() => navigation.navigate("HomeScreen")}
                />
              ),
              headerRight: null,
              title: "Send Coupons",
            })}
          />

          <Drawer.Screen
            name="DepositScreen"
            component={DepositScreen}
            options={({ navigation }) => ({
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerTitleStyle: {
                color: "#2c3e50",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#2c3e50"}
                  size={30}
                  onPress={() => navigation.navigate("HomeScreen")}
                />
              ),
              headerRight: null,
              title: "Deposit Funds",
            })}
          />

          <Drawer.Screen
            name="WithdrawScreen"
            component={WithdrawScreen}
            options={({ navigation }) => ({
              headerShown: true,
              drawerItemStyle: {
                display: "none",
              },
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerTitleStyle: {
                color: "#2c3e50",
              },
              headerLeft: () => (
                <CustomIcon
                  name={"md-arrow-back"}
                  color={"#2c3e50"}
                  size={30}
                  onPress={() => navigation.navigate("HomeScreen")}
                />
              ),
              headerRight: null,
              title: "Withdraw Funds",
            })}
          />
        </Drawer.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}
