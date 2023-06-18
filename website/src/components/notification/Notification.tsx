import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeyPress } from "../../hooks/useKeyPress";
import {
  clearNotification,
  NotificationInfo,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import Calendar from "./Calendar";
import Categories from "./Categories";
import EditProfile from "./EditProfile";
import NotificationPopup from "./NotificationPopup";
import NewSpotProduct from "./NewSpotProduct";

const Notification = () => {
  const dispatch = useDispatch();
  const escPressed = useKeyPress("Escape");

  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  useEffect(() => {
    if (notificationInfo.type !== "loading" && escPressed) {
      dispatch(clearNotification());
    }
  }, [escPressed]);

  if (notificationInfo.type === "edit_profile") {
    return <EditProfile />;
  }

  if (notificationInfo.type === "category_popup") {
    return <Categories />;
  }

  if (notificationInfo.type === "datepicker_popup") {
    return <Calendar />;
  }

  if (notificationInfo.type === "spot_product") {
    return <NewSpotProduct />;
  }

  if (
    notificationInfo.type === "error" ||
    notificationInfo.type === "success"
  ) {
    return <NotificationPopup />;
  }
  return <NotificationPopup />;

  return null;
};

export default Notification;
