import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { accent, gray, white } from "../../constants/colors";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CameraButton = () => {
  const navigation = useNavigation<any>();

  const handleClick = useCallback(async () => {
    const mediaStatus = await MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();

    if (cameraStatus.status === "granted" && mediaStatus.status === "granted") {
      navigation.navigate("Camera");
    }
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <EntypoIcon name="circular-graph" color={white} size={26} />
    </TouchableOpacity>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    backgroundColor: accent,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: gray,
    borderWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export const cameraButtonStyle = styles.container;
