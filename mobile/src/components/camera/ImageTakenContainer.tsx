import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { white } from "../../constants/colors";
import {
  cameraContainerStyle,
  cameraHeight,
  height,
} from "./CameraScreenContainer";

const ImageTakenContainer: React.FC<{ image: string }> = ({ image }) => {
  return (
    <View style={{ ...cameraContainerStyle, backgroundColor: white }}>
      <Image
        source={{ uri: image }}
        style={{ width: "100%", resizeMode: "cover", height: cameraHeight }}
      />

      <View style={styles.categoryContainer}></View>
    </View>
  );
};

export default ImageTakenContainer;

const styles = StyleSheet.create({
  container: {},
  categoryContainer: {
    height: height - cameraHeight,
    backgroundColor: "red",
  },
});

const Category = () => {
  return <View></View>;
};
