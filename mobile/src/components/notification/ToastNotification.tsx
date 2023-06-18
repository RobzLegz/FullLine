import React, { useCallback, useEffect, useRef } from "react";
import { TouchableOpacity, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import {
  NotificationInfo,
  clearToastNotification,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { accent1, accent3, primary600 } from "../../constants/colors";

const ToastNotification = () => {
  const dispatch = useDispatch();

  const notifiactionInfo: NotificationInfo = useSelector(selectNotification);
  const timeoutSet = useRef(false);

  const handleClick = useCallback(async () => {
    if (!notifiactionInfo.toast) {
      dispatch(clearToastNotification());
      return;
    }

    if (notifiactionInfo.toast.fun) {
      await notifiactionInfo.toast.fun();
    }

    dispatch(clearToastNotification());
  }, [notifiactionInfo.toast]);

  useEffect(() => {
    if (notifiactionInfo.toast && !timeoutSet.current) {
      timeoutSet.current = true;

      setTimeout(() => {
        dispatch(clearToastNotification());
        timeoutSet.current = false;
      }, 4000);
    }
  }, [notifiactionInfo.toast]);

  if (!notifiactionInfo.toast) {
    return null;
  }

  const { title, type, message } = notifiactionInfo.toast;

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        top: 20,
        width: "100%",
        position: "absolute",
        alignItems: "center",
        zIndex: 60,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor:
            type === "error"
              ? accent3
              : type === "success"
              ? primary600
              : accent1,
          width: "90%",
          position: "absolute",
          borderRadius: 5,
          padding: 10,
          shadowColor: "#000000",
          shadowOpacity: 0.4,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 1 },
          elevation: 2,
          opacity: 0.9,
        }}
        onPress={handleClick}
        activeOpacity={1}
      >
        <Text
          style={{
            color: "#F6F4F4",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: "#F6F4F4",
            fontWeight: "500",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ToastNotification;
