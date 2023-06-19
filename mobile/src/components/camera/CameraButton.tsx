import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { accent, gray, white } from "../../constants/colors";
import EntypoIcon from "react-native-vector-icons/Entypo";

const CameraButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <EntypoIcon name="circular-graph" color={white} size={26} />
    </TouchableOpacity>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    backgroundColor: accent,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: gray,
    borderWidth: 4,
  },
});
