import React, { memo, useCallback } from "react";
import { ExCountry } from "../../interfaces/backendTypes";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { P } from "../../styles/text";
import {
  AppInfo,
  selectApp,
  setEventRecomendations,
  setFeedEvents,
  setSelectedCountry,
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
import { getFeed, getFeedEvents } from "../../requests/feedRequests";

const PopupCountry: React.FC<ExCountry> = memo((props) => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  const handleCountryPress = useCallback(async () => {
    dispatch(setSelectedCountry(props));
    dispatch(clearNotification());

    dispatch(setEventRecomendations([]));
    dispatch(setFeedEvents([]));

    dispatch(setNotification({ type: "modal_loading" }));

    await getFeed({
      dispatch,
      city: appInfo.selectedCountry.id,
      token: userInfo.token,
      country: props.id,
    });

    await getFeedEvents({
      dispatch,
      city: appInfo.selectedCountry.id,
      token: userInfo.token,
      country: props.id,
    });

    dispatch(clearNotification());
  }, [userInfo.token, props, appInfo.selectedCountry.id, userInfo.info?.id]);

  return (
    <TouchableOpacity
      onPress={handleCountryPress}
      style={{
        ...styles.popupCountry,
        borderColor:
          (appInfo.selectedCountry.id === props.id &&
            notificationInfo.type !== "search_city_popup") ||
          (notificationInfo.type === "search_city_popup" &&
            appInfo.searchCity?.id === props.id)
            ? accent3
            : primary700,
      }}
    >
      {props.flag && (
        <View
          style={{
            borderRadius: 2,
            overflow: "hidden",
            width: 35,
            height: 25,
            marginRight: 6,
          }}
        >
          <Image
            source={{ uri: props.flag }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
      )}

      <P
        style={{
          color:
            (appInfo.selectedCountry.id === props.id &&
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

export default PopupCountry;

const styles = StyleSheet.create({
  popupCountry: {
    width: "100%",
    height: 50,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
