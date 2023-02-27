import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { Storage } from "expo-storage";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-root-toast";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

type IProps = {
  onScan: (event: any) => void;
  onClose: () => void;
  children: any;
  navigation: any;
};

export default function SnyBarCodeScanner(props: IProps) {
  const { onScan, onClose, children, navigation } = props;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [screen, setScreen] = useState<string>("scan");
  const [scanned, setScanned] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  const [sizeQrCode, setSizeQrCode] = useState<any>({ width: 0, height: 0 });
  const lineAnim = useRef(new Animated.Value(0)).current;
  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

  const onLineLayout = (event: any) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setSizeQrCode({ width: width, height: height });
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status }: any = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    setScreen("scan");
    setScanned(!scanned);
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    handleAnimationLine();
    NetInfo.fetch().then((state) => {
      let toast = Toast.show(`${state.type} connected!`, {
        duration: Toast.durations.LONG,
        backgroundColor: "#FFF",
        textColor: "#000",
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 500);
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isInternetReachable);
    });
  }, []);

  const handleAnimationLine = () => {
    lineAnim.setValue(0);
    Animated.timing(lineAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start(() => handleAnimationLine());
  };

  const transformLine = lineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sizeQrCode?.height],
  });

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: any;
    data: any;
  }) => {
    onScan && onScan(data);
    setScanned(!scanned);
    try {
      setloading(true);
      console.log("data", data);
      await axios.get(data).then(function (res) {
        if (res.data.paid) {
          setloading(false);
          alert(`INVOICE IS PAID ALREADY`);
        } else {
          setloading(false);
          alert(`PAY $ ${res.data.total_cost} `);
          delay(5000);
          navigation.navigate("AddCardScreen", res.data);
        }
      });
    } catch (error) {
      setloading(false);
      alert(error);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.title}>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.title}>No access to camera</Text>
      </View>
    );
  }

  if (loading === true) {
    return (
      <View style={styles.centeredView}>
        <View style={{ marginBottom: 25, marginTop: "20%" }}>
          <ActivityIndicator size="large" color="#000" />
        </View>

        <View style={styles.container}>
          <Text style={styles.balance}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {(screen === "scan" && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[styles.container]}
        >
          <View style={styles.layerTop}></View>
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />

            <View style={styles.focused} onLayout={onLineLayout}>
              <EdgeQRCode position="topRight" />
              <EdgeQRCode position="topLeft" />
              <Animated.View
                style={[
                  {
                    transform: [{ translateY: transformLine }],
                  },
                  styles.lineAnim,
                ]}
              />
              <EdgeQRCode position="bottomRight" />
              <EdgeQRCode position="bottomLeft" />
            </View>
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </BarCodeScanner>
      )) ||
        (screen === "data" && (
          <View style={{ backgroundColor: "white" }}>{children}</View>
        ))}
      {/* Actions */}
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.6)",
            width: 22,
            height: 22,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 13,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <Ionicons name="ios-close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.bottomAction}>
        <TouchableOpacity
          onPress={() => {
            setScreen("scan"), setScanned(!scanned);
          }}
        >
          <View style={styles.bottomButtonAction}>
            <MaterialCommunityIcons
              name="barcode-scan"
              size={20}
              color="#fff"
            />
            <Text style={styles.bottomTextAction}>SCAN</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const EdgeQRCode = ({ position }: { position: string }) => {
  const edgeWidth = 20;
  const edgeHeight = 20;
  const edgeColor = "#FFF";
  const edgeBorderWidth = 4;
  const edgeRadius = 0;

  const defaultStyle = {
    width: edgeWidth,
    height: edgeHeight,
    borderColor: edgeColor,
  };
  const edgeBorderStyle: any = {
    topRight: {
      borderRightWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopRightRadius: edgeRadius,
      top: edgeRadius,
      right: edgeRadius,
    },
    topLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopLeftRadius: edgeRadius,
      top: edgeRadius,
      left: edgeRadius,
    },
    bottomRight: {
      borderRightWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomRightRadius: edgeRadius,
      bottom: edgeRadius,
      right: edgeRadius,
    },
    bottomLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomLeftRadius: edgeRadius,
      bottom: edgeRadius,
      left: edgeRadius,
    },
  };
  return (
    <View
      style={[
        defaultStyle,
        styles[position + "Edge"],
        edgeBorderStyle[position],
      ]}
    />
  );
};

const opacity = "rgba(0, 0, 0, .6)";
const styles: any = StyleSheet.create({
  // action
  close: {
    position: "absolute",
    top: Constants.statusBarHeight + 20,
    left: 20,
    width: 40,
    height: 40,
  },
  bottomAction: {
    backgroundColor: "rgba(0,0,0,.6)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90,
    position: "absolute",
    width: deviceWidth,
    bottom: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomButtonAction: { alignItems: "center", width: deviceWidth },
  bottomTextAction: {
    color: "white",
    fontSize: 13,
    lineHeight: 22,
    // fontFamily: "Roboto_500Medium",
    marginTop: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  balance: {
    paddingTop: 10,
    paddingBottom: 20,

    fontSize: 48,
    fontWeight: "300",
    textAlign: "center",
    color: "#2c3e50",
  },
  // layout
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: deviceHeight,
    height: deviceHeight / 2,
  },

  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },

  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 1,
    position: "relative",
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 4,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },

  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },

  // edge
  topLeftEdge: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  lineAnim: { height: 2, backgroundColor: "#fff" },
});
