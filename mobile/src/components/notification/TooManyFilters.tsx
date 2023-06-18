import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { P } from "../../styles/text";
import { darkGray } from "../../constants/colors";
import { StyleSheet, View } from "react-native";

interface Props {
  msg?: string;
}

const TooManyFilters: React.FC<Props> = ({
  msg = "Neatradām Jūsu filtriem atbilstošus pasākumus :(",
}) => {
  return (
    <View style={styles.notif}>
      <Ionicons name="ios-filter" style={{ color: darkGray, fontSize: 24 }} />

      <P style={{ color: darkGray }}>{msg}</P>
    </View>
  );
};

export default TooManyFilters;

const styles = StyleSheet.create({
  notif: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
});
