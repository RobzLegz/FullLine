import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import CategoryIcon from "../category/CategoryIcon";
import CameraButton from "../camera/CameraButton";
import CalendarComponent from "./CalendarComponent";

const HomeContainer = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.categories) {
    return null;
  }

  return (
    <View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {appInfo.categories.map((category, index) => (
            <CategoryIcon {...category} key={index} />
          ))}
        </View>

        <CalendarComponent />
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CameraButton />
      </View>
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 30,
  },
  categoriesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});
