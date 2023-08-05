import React from "react";
import { basicScreen } from "../styles/screens";
import { View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const ScreenModule = ({ ...props }) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView>
        <StatusBar style="dark" />

        <View style={basicScreen}>{props.children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScreenModule;
