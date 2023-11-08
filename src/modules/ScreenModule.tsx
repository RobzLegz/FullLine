import React, { Fragment } from "react";
import { basicScreen } from "../styles/screens";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StatusBarStyle } from "expo-status-bar";

const ScreenModule: React.FC<{
  children?: React.ReactNode;
  statusBgColor?: string;
  barStyle?: StatusBarStyle;
  bgColor?: string;
}> = ({
  children,
  statusBgColor = "#000000",
  barStyle = "light",
}) => {
  return (
    <Fragment>
      <StatusBar backgroundColor={statusBgColor} style={barStyle} />
      <SafeAreaView style={{ flex: 0, backgroundColor: statusBgColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: statusBgColor }}>
        <View style={basicScreen}>{children}</View>
      </SafeAreaView>
    </Fragment>
  );
};

export default ScreenModule;
