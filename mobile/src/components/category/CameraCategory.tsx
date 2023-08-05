import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { black, white } from "../../constants/colors";
import { Small } from "../../styles/text";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  selectCategory,
} from "../../redux/slices/appSlice";
import { Category } from "../../data/categories";

const CameraCategory: React.FC<Category> = ({ color, icon, title, id }) => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const handleSelect = () => {
    dispatch(selectCategory(id));
  };

  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{
          ...styles.container,
          backgroundColor: appInfo.selectedCategories.some((c) => c === id)
            ? color
            : white,
        }}
        onPress={handleSelect}
      >
        <View style={styles.body}>
          <Image source={icon} style={styles.icon} />
          <View
            style={{
              height: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Small
              style={{
                fontSize: 10,
                color: appInfo.selectedCategories.some((c) => c === id)
                  ? white
                  : black,
              }}
            >
              {title}
            </Small>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
