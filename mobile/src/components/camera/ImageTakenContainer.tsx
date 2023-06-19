import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { white } from "../../constants/colors";
import { cameraContainerStyle, cameraHeight } from "./CameraScreenContainer";

const ImageTakenContainer: React.FC<{ image: string }> = ({ image }) => {
  return (
    <View style={{ ...cameraContainerStyle, backgroundColor: white }}>
      <Image
        source={{ uri: image }}
        style={{ width: "100%", resizeMode: "cover", height: cameraHeight }}
      />
    </View>
  );
};

export default ImageTakenContainer;

const styles = StyleSheet.create({});
