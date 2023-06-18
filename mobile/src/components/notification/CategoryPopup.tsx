import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { H3, P } from "../../styles/text";
import PopupCategory from "../categories/PopupCategory";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { clearNotification } from "../../redux/slices/notificationSlice";
import { accent3, primary700, primary800 } from "../../constants/colors";
import { ActivityIndicator } from "react-native";
import { formatCityName } from "../../utils/formatCityName";

const CategoryPopup = memo(() => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const closeCategories = () => {
    dispatch(clearNotification());
  };

  useEffect(() => {
    const backAction = () => {
      closeCategories();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={categoryStyles.popup}>
      <View style={categoryStyles.popupContainer}>
        <View style={categoryStyles.header}>
          <H3>Kategorijas</H3>

          <TouchableOpacity onPress={closeCategories}>
            <Ionicons
              name="ios-checkmark-sharp"
              style={{ fontSize: 28, color: accent3 }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={categoryStyles.scroller}
          showsVerticalScrollIndicator={false}
        >
          <View style={categoryStyles.categories}>
            {appInfo.categories ? (
              appInfo.categories.length > 0 ? (
                appInfo.categories.map((category) => (
                  <PopupCategory {...category} key={category.id} />
                ))
              ) : (
                <View style={categoryStyles.loader}>
                  <P style={{ fontSize: 16 }}>
                    {formatCityName(appInfo.selectedCity.name)} kategorijas nav
                    pieejamas :(
                  </P>
                </View>
              )
            ) : (
              <View style={categoryStyles.loader}>
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
});

export default CategoryPopup;

const categoryStyles = StyleSheet.create({
  popup: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loader: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  popupContainer: {
    width: "100%",
    height: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: primary800,
    borderWidth: 2,
    borderColor: primary700,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
  },
  scroller: {
    width: "100%",
    marginTop: 10,
  },
  categories: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export const filterPopupStyle = categoryStyles.popup;
export const filterPopupLoader = categoryStyles.loader;
export const filterPopupContainer = categoryStyles.popupContainer;
export const filterHeader = categoryStyles.header;
export const filterScroller = categoryStyles.scroller;
export const filterOptionsWrapped = categoryStyles.categories;
