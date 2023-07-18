import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { black, white } from "../../constants/colors";
import { Small } from "../../styles/text";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../redux/slices/appSlice";
import { Category } from "../../data/categories";

const CameraCategory: React.FC<Category> = ({ color, icon, title, id }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    dispatch(selectCategory(id));
    setSelected(!selected);
  };

  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: selected ? color : white }}
      onPress={handleSelect}
    >
      <View style={styles.body}>
        <Image source={icon} style={styles.icon} />
        <View
          style={{ height: 20, alignItems: "center", justifyContent: "center" }}
        >
          <Small style={{ fontSize: 10, color: selected ? white : black }}>
            {title}
          </Small>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CameraCategory;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    maxHeight: 70,
    width: 70,
    borderRadius: 10,
    position: "relative",
    backgroundColor: white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 5,
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 5,
    resizeMode: "contain",
  },
  body: {
    width: "100%",
    height: "100%",
    zIndex: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  fillColor: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
  },
});
