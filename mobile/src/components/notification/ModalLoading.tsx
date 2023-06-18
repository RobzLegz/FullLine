import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import {
  NotificationInfo,
  selectNotification,
} from "../../redux/slices/notificationSlice";

const ModalLoading = () => {
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  if (notificationInfo.type !== "modal_loading") {
    return null;
  }

  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default ModalLoading;

const styles = StyleSheet.create({
  loader: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

export const modalLoaderStyle = styles.loader;
