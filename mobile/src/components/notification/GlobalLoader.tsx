import React from "react";
import { ActivityIndicator, View } from "react-native";
import { modalLoaderStyle } from "./ModalLoading";

const GlobalLoader = () => {
  return (
    <View
      style={{
        ...modalLoaderStyle,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default GlobalLoader;
