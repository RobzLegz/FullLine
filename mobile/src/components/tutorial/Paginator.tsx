import { StyleSheet, Animated, View, useWindowDimensions } from "react-native";
import React from "react";
import { accent } from "../../styles/colors";

const Paginator: React.FC<{
  data: {
    id: string;
    title: string;
    description: string;
    image: any;
  }[];
  scrollX: any;
}> = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const dotOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i}
            style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: accent,
  },
});
