import { StyleSheet } from "react-native";
import { primary900 } from "../constants/colors";

const screenStyles = StyleSheet.create({
  basicScreen: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: primary900,
  },
});

export const basicScreen = screenStyles.basicScreen;
