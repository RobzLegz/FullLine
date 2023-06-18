import { StyleSheet, Image } from "react-native";
import React from "react";

const EventImage: React.FC<{ src: string; alt: string }> = ({ src }) => {
  return <Image source={{ uri: src }} style={styles.eventImage} />;
};

export default EventImage;

const styles = StyleSheet.create({
  eventImage: {
    height: 200,
    width: 200,
    resizeMode: "cover",
    marginRight: 4,
    borderRadius: 8,
  },
});
