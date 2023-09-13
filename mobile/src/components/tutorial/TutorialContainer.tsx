import { StyleSheet, Animated, View, useWindowDimensions } from "react-native";
import React, { useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { slides } from "./slides";
import Slide from "./Slide";
import Paginator from "./Paginator";
import NextButton from "./NextButton";

const TutorialContainer = () => {
  const { width } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);

  const slidesRef = useRef<FlashList<any>>(null);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNextPagePress = () => {
    if (currentIndex >= slides.length - 1) {
      return;
    }

    const s = slidesRef.current;
    if (s) {
      s.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlashList
          data={slides}
          renderItem={({ item }) => <Slide {...item} />}
          pagingEnabled
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          estimatedItemSize={width}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>

      <NextButton onPress={handleNextPagePress} />

      <Paginator data={slides} scrollX={scrollX} />
    </View>
  );
};

export default TutorialContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
