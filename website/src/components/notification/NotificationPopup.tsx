import React from "react";
import {
  NotificationInfo,
  clearNotification,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";

const NotificationPopup = () => {
  const dispatch = useDispatch();

  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  const handleNotificationClick = () => {
    dispatch(clearNotification());
  };

  if (
    (notificationInfo.type !== "success" &&
      notificationInfo.type !== "error") ||
    !notificationInfo.message
  ) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-center z-50">
      <button
        className="absolute top-0 translate-y-16 transition-transform px-4 py-2 rounded-md duration-300 text-white bg-primary-800 animate-popup max-w-[500px]"
        onClick={handleNotificationClick}
      >
        {notificationInfo.message}
      </button>
    </div>
  );
};

export default NotificationPopup;
