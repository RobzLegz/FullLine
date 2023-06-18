import React from "react";
import { basicScreen } from "../styles/screens";
import { View, Platform } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { primary900 } from "../constants/colors";

const ScreenModule = ({ ...props }) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView>
        {Platform.OS === "ios" ? (
          <StatusBar style="light" />
        ) : (
          <StatusBar style="light" backgroundColor={primary900} />
        )}
        <View style={basicScreen}>{props.children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScreenModule;
