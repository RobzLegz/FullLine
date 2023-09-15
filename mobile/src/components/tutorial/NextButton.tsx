import { StyleSheet, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { accent } from "../../styles/colors";
import AntDesign from "react-native-vector-icons/AntDesign";

const NextButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "relative",
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 64,
        borderWidth: 2,
        borderColor: accent,
        marginBottom: 10,
      }}
      activeOpacity={1}
    >
      <AntDesign name="arrowright" size={30} color={accent} />
    </TouchableOpacity>
  );
};

export default NextButton;
