import { StyleSheet } from "react-native";
import { white } from "../constants/colors";

const screenStyles = StyleSheet.create({
  basicScreen: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: white,
  },
});

export const basicScreen = screenStyles.basicScreen;
