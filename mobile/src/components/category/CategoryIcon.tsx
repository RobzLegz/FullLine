import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { ExCategory } from "../../interfaces/backendTypes";
import { white } from "../../constants/colors";
import { P } from "../../styles/text";

const CategoryIcon: React.FC<ExCategory> = ({ height, color, icon, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.category}>
        <View style={styles.body}>
          <Image source={{ uri: icon }} style={styles.icon} />
        </View>

        <View
          style={{
            ...styles.fillColor,
            backgroundColor: color,
            height: height,
          }}
        ></View>
      </TouchableOpacity>

      <P style={{ marginTop: 6, fontSize: 12 }}>{title}</P>
    </View>
  );
};

export default CategoryIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    marginHorizontal: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  body: {
    width: "100%",
    height: "100%",
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  fillColor: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
  },
});
