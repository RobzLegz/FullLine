import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  accent3,
  primary600,
  primary700,
  primary800,
  white,
} from "../../constants/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { navigateToNearbySearch } from "../../utils/getCoords";
import { filterButtonStyle } from "../search/SearchModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  AppInfo,
  selectApp,
  setCurrentEvent,
  setCurrentSpot,
  setFilterMapEvents,
  setModalEvents,
  setPopmodal,
} from "../../redux/slices/appSlice";
import {
  NotificationInfo,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import { searchMapEvents } from "../../requests/eventRequests";
import { UserInfo, selectUser } from "../../redux/slices/userSlice";

const MapOptions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  const handleFilterClick = () => {
    dispatch(setPopmodal(0));
    dispatch(setModalEvents(null));
    dispatch(setCurrentEvent(null));
    dispatch(setCurrentSpot(null));
    dispatch(setFilterMapEvents(appInfo.filterMapEvents + 1));
  };

  const handleSearch = async () => {
    await searchMapEvents({
      dispatch,
      token: userInfo.token,
      city: appInfo.searchCity?.id,
      categories: appInfo.selectedCategories,
      startDate: appInfo.selectedStartDate,
      endDate: appInfo.selectedEndDate,
    });
  };

  useEffect(() => {
    if (
      !notificationInfo.type &&
      (appInfo.searchCity ||
        appInfo.selectedStartDate ||
        appInfo.selectedEndDate ||
        appInfo.selectedCategories.length > 0)
    ) {
      handleSearch();
    }
  }, [
    appInfo.searchCity,
    appInfo.selectedStartDate,
    appInfo.selectedEndDate,
    appInfo.selectedCategories,
    notificationInfo.type,
  ]);

  const handleNavigatePress = async () => {
    await navigateToNearbySearch(dispatch, navigation);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          ...filterButtonStyle,
          borderColor: primary700,
          backgroundColor:
            appInfo.searchCity ||
            appInfo.selectedCategories.length > 0 ||
            appInfo.selectedStartDate
              ? accent3
              : primary800,
          borderWidth:
            appInfo.searchCity ||
            appInfo.selectedCategories.length > 0 ||
            appInfo.selectedStartDate
              ? 0
              : 2,
          borderRadius: 25,
          width: 45,
          height: 45,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
        onPress={handleFilterClick}
      >
        <Ionicons
          style={{
            fontSize: 20,
            color: white,
          }}
          name="ios-filter"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...filterButtonStyle,
          borderRadius: 12,
          width: 55,
          height: 55,
          paddingVertical: 0,
          paddingHorizontal: 0,
          justifyContent: "center",
          borderColor: primary600,
        }}
        onPress={handleNavigatePress}
        activeOpacity={1}
      >
        <MaterialIcons name="my-location" size={30} color={accent3} />
      </TouchableOpacity>
    </View>
  );
};

export default MapOptions;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "flex-end",
    zIndex: 5,
  },
});
