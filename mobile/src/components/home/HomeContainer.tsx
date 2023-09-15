import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import CategoryIcon from "./CategoryIcon";
import CameraButton from "../camera/CameraButton";
import CalendarComponent from "./CalendarComponent";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { accent, white } from "../../styles/colors";
import { getDominantCategories } from "../reflection/getDominantCategories";

const HomeContainer = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  const openReflection = () => {
    const data = getDominantCategories(appInfo.categories);

    console.log(data);
  };

  if (!appInfo.categories) {
    return null;
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
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
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ width: 50, marginRight: 20 }} />

        <CameraButton />

        <TouchableOpacity
          style={{
            width: 50,
            marginLeft: 20,
            height: 50,
            borderRadius: 25,
            backgroundColor: white,
            borderWidth: 2,
            borderColor: accent,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={openReflection}
        >
          <FontAwesome5 name="fire-alt" size={30} color={accent} />
        </TouchableOpacity>
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
