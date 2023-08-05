import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { accent, white } from "../../constants/colors";
import {
  TopControls,
  cameraContainerStyle,
  cameraHeight,
  height,
} from "./CameraScreenContainer";
import {
  AppInfo,
  postImage,
  selectApp,
  selectCategory,
} from "../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import CameraCategory from "../category/CameraCategory";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ImageTakenContainer: React.FC<{
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ image, setImage }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);

  const savePicture = async () => {
    if (appInfo.selectedCategories.length === 0) {
      Alert.alert("Please select at least one category");

      return;
    }

    if (appInfo.selectedCategories.length > 3) {
      Alert.alert("You can only select 3 categories");

      return;
    }

    if (!image) {
      Alert.alert("Something went wrong");

      return;
    }

    try {
      dispatch(postImage({ src: image, date: String(new Date()) }));

      setImage(null);

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  if (!appInfo.categories) {
    return null;
  }

  return (
    <View style={{ ...cameraContainerStyle, backgroundColor: white }}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            resizeMode: "cover",
            height: cameraHeight ? cameraHeight : "100%",
          }}
        />
      )}

      <View style={styles.bottomContainer}>
        <View style={{ height: "100%", flex: 1 }}>
          <ScrollView
            style={styles.categoryContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {appInfo.categories.map((cat) => (
              <CameraCategory {...cat} key={cat.id} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sendButtonContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={savePicture}>
            <IonIcon name="send" size={24} color={white} />
          </TouchableOpacity>
        </View>
      </View>

      <TopControls
        retake={() => {
          setImage(null);
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
    width: 65,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    backgroundColor: accent,
    width: 50,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryContainer: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 5,
  },
});
