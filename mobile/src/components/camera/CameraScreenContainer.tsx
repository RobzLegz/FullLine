import React, { useState, useEffect, useRef } from "react";
import { Dimensions, View, StyleSheet, Alert, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import { black } from "../../constants/colors";

const { height, width } = Dimensions.get("window");

const cameraHeight = Math.round((width * 16) / 9);

const CameraScreenContainer = () => {
  const [type, setType] = useState(Camera.Constants.Type);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode);
  const [image, setImage] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        console.log(asset);
        Alert.alert("Picture saved! 🎉");
        setImage(null);
        console.log("saved successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <View style={styles.cameraContainer}>
          <Camera
            type={type}
            ref={cameraRef}
            flashMode={flash}
            ratio="16:9"
            style={styles.camera}
          />
        </View>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
    </View>
  );
};

export default CameraScreenContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: black,
  },
  cameraContainer: {
    width: "100%",
    height: cameraHeight,
    borderRadius: 25,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  topControls: {
    flex: 1,
  },
});
