import { StyleSheet, Image, View, ScrollView } from "react-native";
import React from "react";
import { white } from "../../constants/colors";
import {
  TopControls,
  cameraContainerStyle,
  cameraHeight,
  height,
} from "./CameraScreenContainer";
import {
  AppInfo,
  selectApp,
  selectCategory,
} from "../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import CameraCategory from "../category/CameraCategory";

const ImageTakenContainer: React.FC<{ image: string; retake: () => void }> = ({
  image,
  retake,
}) => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.categories) {
    return null;
  }

  return (
    <View style={{ ...cameraContainerStyle, backgroundColor: white }}>
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          resizeMode: "cover",
          height: cameraHeight ? cameraHeight : "100%",
        }}
      />

      <View style={styles.bottomContainer}>
        <View style={{ height: "100%", flex: 1 }}>
          <ScrollView
            style={styles.categoryContainer}
            horizontal
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {appInfo.categories.map((cat) => (
              <CameraCategory {...cat} key={cat.id} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sendButtonContainer}></View>
      </View>

      <TopControls
        retake={() => {
          retake();
          dispatch(selectCategory(null));
        }}
      />
    </View>
  );
};

export default ImageTakenContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
  },
  bottomContainer: {
    flexDirection: "row",
    height: cameraHeight ? height - cameraHeight : 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sendButtonContainer: {
    width: 60,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryContainer: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 5,
  },
});
