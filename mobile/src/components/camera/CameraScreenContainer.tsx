import React, { useState, useRef, useCallback } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons, Octicons, Entypo } from "@expo/vector-icons";
import { white } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { cameraButtonStyle } from "./CameraButton";
import ImageTakenContainer from "./ImageTakenContainer";
import { Asset } from "expo-asset";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

export const { height, width } = Dimensions.get("window");

export const cameraHeight = Math.round((width * 16) / 9);

const CameraScreenContainer = () => {
  const [type, setType] = useState("back");
  const [flash, setFlash] = useState("off");
  const [image, setImage] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);

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

  if (image) {
    return <ImageTakenContainer image={image} />;
  }

  return (
    <View style={styles.container}>
      <TopControls />

      <View style={styles.cameraContainer}>
        <Camera
          type={type as any}
          ref={cameraRef}
          flashMode={flash as any}
          ratio="16:9"
          style={styles.camera}
          autoFocus={"on" as any}
        />
      </View>

      <BottomControls
        flash={flash}
        setFlash={setFlash}
        type={type}
        setType={setType}
        cameraRef={cameraRef}
        setImage={setImage}
      />
    </View>
  );
};

export default CameraScreenContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    position: "relative",
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
    padding: 10,
  },
  bottomControls: {
    width: "100%",
    height: height - cameraHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  cameraButtonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 30,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const cameraContainerStyle = styles.container;

const TopControls = () => {
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={styles.topControls}>
      <TouchableOpacity onPress={goBack}>
        <MaterialIcons name="close" size={35} color={white} />
      </TouchableOpacity>
    </View>
  );
};

const BottomControls: React.FC<{
  flash: string;
  type: string;
  setFlash: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  cameraRef: React.RefObject<Camera>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ flash, setFlash, setType, type, cameraRef, setImage }) => {
  const changeFlash = () => {
    setFlash(flash === "torch" ? "off" : "torch");
  };

  const chageType = () => {
    setType(type === "front" ? "back" : "front");
  };

  return (
    <View style={styles.bottomControls}>
      <TouchableOpacity onPress={changeFlash} style={{ zIndex: 4 }}>
        <MaterialIcons
          name={flash === "torch" ? "flash-off" : "flash-on"}
          size={30}
          color={white}
        />
      </TouchableOpacity>

      <CameraScreenButton
        cameraRef={cameraRef}
        setImage={setImage}
        type={type}
      />

      <TouchableOpacity onPress={chageType} style={{ zIndex: 4 }}>
        <Octicons name="arrow-switch" size={30} color={white} />
      </TouchableOpacity>
    </View>
  );
};

const CameraScreenButton: React.FC<{
  cameraRef: React.RefObject<Camera>;
  type: string;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ cameraRef, setImage, type }) => {
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          isImageMirror: true,
        });

        if (type === "front") {
          const manipResult = await manipulateAsync(data.uri, [
            { flip: FlipType.Horizontal },
          ]);
          setImage(manipResult.uri);

          return;
        }

        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.cameraButtonContainer}>
      <TouchableOpacity style={cameraButtonStyle} onPress={takePicture}>
        <Entypo name="circular-graph" color={white} size={26} />
      </TouchableOpacity>
    </View>
  );
};
