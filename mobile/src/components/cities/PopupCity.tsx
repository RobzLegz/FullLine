import React, { memo, useCallback } from "react";
import { ExCity } from "../../interfaces/backendTypes";
import { StyleSheet, TouchableOpacity } from "react-native";
import { P } from "../../styles/text";
import {
  AppInfo,
  selectApp,
  setEventRecomendations,
  setFeed,
  setFeedEvents,
  setSearchCity,
  setSelectedCity,
} from "../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { accent3, darkGray, primary700 } from "../../constants/colors";
import {
  clearNotification,
  NotificationInfo,
  selectNotification,
  setNotification,
} from "../../redux/slices/notificationSlice";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { getFeedEvents } from "../../requests/feedRequests";

const PopupCity: React.FC<ExCity> = memo((props) => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  const handleCityPress = useCallback(async () => {
    if (notificationInfo.type === "search_city_popup") {
      dispatch(setSearchCity(props));
      dispatch(clearNotification());

      return;
    }

    dispatch(setSelectedCity(props));
    dispatch(clearNotification());

    dispatch(setNotification({ type: "modal_loading" }));

    dispatch(setEventRecomendations([]));
    dispatch(setFeed([]));
    dispatch(setFeedEvents([]));

    await getFeedEvents({
      dispatch,
      city: props.id,
      token: userInfo.token,
      country: appInfo.selectedCountry.id,
    });

    dispatch(clearNotification());
  }, [userInfo.token, props, appInfo.selectedCountry.id, userInfo.info?.id]);

  return (
    <TouchableOpacity
      onPress={handleCityPress}
      style={{
        ...styles.popupCity,
        borderColor:
          (appInfo.selectedCity.id === props.id &&
            notificationInfo.type !== "search_city_popup") ||
          (notificationInfo.type === "search_city_popup" &&
            appInfo.searchCity?.id === props.id)
            ? accent3
            : primary700,
      }}
    >
      <P
        style={{
          color:
            (appInfo.selectedCity.id === props.id &&
              notificationInfo.type !== "search_city_popup") ||
            (notificationInfo.type === "search_city_popup" &&
              appInfo.searchCity?.id === props.id)
              ? accent3
              : darkGray,
        }}
      >
        {props.name}
      </P>
    </TouchableOpacity>
  );
});

export default PopupCity;

const styles = StyleSheet.create({
  popupCity: {
    width: "100%",
    height: 50,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
