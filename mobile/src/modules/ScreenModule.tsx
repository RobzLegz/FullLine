import React from "react";
import { basicScreen } from "../styles/screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Notification from "../components/notification/Notification";
import { View, Platform } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { primary900 } from "../constants/colors";
import ToastNotification from "../components/notification/ToastNotification";

const ScreenModule = ({ ...props }) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView>
        {Platform.OS === "ios" ? (
          <ExpoStatusBar style="light" />
        ) : (
          <ExpoStatusBar style="light" backgroundColor={primary900} />
        )}
        <GestureHandlerRootView>
          <View style={basicScreen}>{props.children}</View>
          <Notification />
          <ToastNotification />
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScreenModule;
