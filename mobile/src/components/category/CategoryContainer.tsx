import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { Icon } from "./CategoryIcon";
import { H3, Small, Strong } from "../../styles/text";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { FullLineImage } from "../../types/image";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const CategoryContainer = () => {
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.currentCategory) {
    return null;
  }

  const { color, height, title, description, icon, images } =
    appInfo.currentCategory;

  const lastImageDate =
    images.length === 0 ? null : new Date(images[images.length - 1].date);

  const lastUpload = !lastImageDate
    ? "None"
    : `${
        lastImageDate.getMonth() > 9
          ? lastImageDate.getMonth()
          : `0${lastImageDate.getMonth()}`
      }.${
        lastImageDate.getDate() > 9
          ? lastImageDate.getDate()
          : `0${lastImageDate.getDate()}`
      }`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ zIndex: 2, marginLeft: 10 }}
        >
          <MaterialIcons name="arrow-back" size={28} color="gray" />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <H3 style={{ fontSize: 18 }}>{title}</H3>
        </View>
      </View>

      <View style={styles.top}>
        <View style={styles.topStats}>
          <Icon {...appInfo.currentCategory} />

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Strong style={{ fontSize: 24, color: "gray", marginBottom: 2 }}>
                {images.length}
              </Strong>

              <Small style={{ color: "gray" }}>Images</Small>
            </View>

            <View style={styles.stat}>
              <Strong style={{ color, fontSize: 24, marginBottom: 2 }}>
                {height}%
              </Strong>

              <Small style={{ color: "gray" }}>Fulfilled</Small>
            </View>

            <View style={styles.stat}>
              <Strong style={{ fontSize: 24, color: "gray", marginBottom: 2 }}>
                {lastUpload}
              </Strong>

              <Small style={{ color: "gray" }}>Last upload</Small>
            </View>
          </View>
        </View>

        <View style={styles.bio}>
          <Small style={{ color: "gray", fontSize: 14 }}>{description}</Small>
        </View>
      </View>

      <ImageGallery images={images} />
    </View>
  );
};

const ImageGallery: React.FC<{ images: FullLineImage[] }> = ({ images }) => {
  const ImageCard: React.FC<FullLineImage> = ({ src }) => {
    return (
      <View style={styles.galleryImage}>
        <Image
          source={{ uri: src }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 5,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.gallery}>
      <FlashList
        data={images}
        renderItem={({ item }) => <ImageCard {...item} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={3}
        estimatedItemSize={WINDOW_WIDTH / 3}
      />
    </View>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  top: {
    width: "100%",
    padding: 20,
    paddingTop: 20,
  },
  topStats: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  stats: {
    flex: 1,
    marginLeft: 22,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
    justifyContent: "center",
  },
  bio: {
    width: "100%",
    marginTop: 12,
  },
  header: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    position: "relative",
    height: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
  },
  gallery: {
    width: "100%",
    minHeight: WINDOW_WIDTH / 3,
    paddingHorizontal: 2
  },
  galleryImage: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
    padding: 2,
  },
});
