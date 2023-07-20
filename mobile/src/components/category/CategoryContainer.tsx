import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { Icon } from "./CategoryIcon";
import { H3, Small, Strong } from "../../styles/text";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { FullLineImage } from "../../types/image";
import { TopControls } from "../camera/CameraScreenContainer";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const CategoryContainer = () => {
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!appInfo.currentCategory) {
    return null;
  }

  const { color, height, title, description, images } = appInfo.currentCategory;

  const lastImageDate = images.length === 0 ? null : new Date(images[0].date);

  const lastUpload = !lastImageDate
    ? "-"
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
                {Math.floor(height)}%
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

      {selectedImage && (
        <FullScreenViewer
          images={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}

      <ImageGallery images={images} setSelectedImage={setSelectedImage} />
    </View>
  );
};

const SMALL_IMAGE_SIZE = 80;

const FullScreenViewer: React.FC<{
  images: FullLineImage[];
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ images, selectedImage, setSelectedImage }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryRef = useRef<FlashList<any>>(null);
  const thumbRef = useRef<FlashList<any>>(null);

  useEffect(() => {
    if (selectedImage) {
      const idx = images.findIndex((im) => im.src === selectedImage);

      if (idx !== 0) {
        changeActiveIndex(idx);
      }
    }
  }, []);

  const changeActiveIndex = (index: number) => {
    setActiveIndex(index);

    galleryRef.current?.scrollToOffset({
      offset: WINDOW_WIDTH * index,
      animated: true,
    });

    if (
      index * (SMALL_IMAGE_SIZE + 5) - SMALL_IMAGE_SIZE / 2 >
      WINDOW_WIDTH / 2
    ) {
      thumbRef.current?.scrollToOffset({
        offset:
          index * (SMALL_IMAGE_SIZE + 5) -
          WINDOW_WIDTH / 2 +
          SMALL_IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  const ImageCard: React.FC<FullLineImage> = ({ src }) => {
    return (
      <View style={styles.fullScreenImage}>
        <Image
          source={{ uri: src }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
    );
  };

  const SmallImageCard: React.FC<FullLineImage & { index: number }> = ({
    src,
    index,
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => changeActiveIndex(index)}
        style={{
          width: SMALL_IMAGE_SIZE,
          height: SMALL_IMAGE_SIZE,
          borderRadius: 5,
          marginRight: 5,
        }}
      >
        <Image
          source={{ uri: src }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 5,
            // borderWidth: index === activeIndex ? 2 : 0,
            // borderColor: index === activeIndex ? "white" : "transparent",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.fullScreenViewer}>
      <View
        style={{
          width: WINDOW_WIDTH,
          minWidth: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          minHeight: WINDOW_HEIGHT,
          flex: 1,
          position: "relative",
        }}
      >
        <TopControls retake={() => setSelectedImage(null)} />

        <FlashList
          ref={galleryRef}
          data={images}
          renderItem={({ item }) => <ImageCard {...item} />}
          estimatedItemSize={Math.floor(WINDOW_WIDTH)}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={WINDOW_WIDTH}
        />

        <View
          style={{
            width: "100%",
            position: "absolute",
            left: 0,
            bottom: 0,
            padding: 10,
          }}
        >
          <FlashList
            ref={thumbRef}
            data={images}
            renderItem={({ item, index }) => (
              <SmallImageCard {...item} index={index} />
            )}
            estimatedItemSize={80}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
    </View>
  );
};

const ImageGallery: React.FC<{
  images: FullLineImage[];
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ images, setSelectedImage }) => {
  const ImageCard: React.FC<FullLineImage> = ({ src }) => {
    return (
      <TouchableOpacity
        style={styles.galleryImage}
        onPress={() => setSelectedImage(src)}
      >
        <Image
          source={{ uri: src }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 5,
          }}
        />
      </TouchableOpacity>
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
    minHeight: "100%",
    paddingHorizontal: 2,
  },
  galleryImage: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
    padding: 2,
  },
  fullScreenViewer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "black",
    zIndex: 5,
  },
  fullScreenImage: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
});
