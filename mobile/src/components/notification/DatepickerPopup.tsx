import { BackHandler, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {
  filterHeader,
  filterPopupContainer,
  filterPopupStyle,
} from "./CategoryPopup";
import { H3 } from "../../styles/text";
import { accent3 } from "../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { clearNotification } from "../../redux/slices/notificationSlice";
import { useDispatch } from "react-redux";
import Calendar from "../calendar/Calendar";

const DatepickerPopup = () => {
  const dispatch = useDispatch();

  const closeDatepicker = () => {
    dispatch(clearNotification());
  };

  useEffect(() => {
    const backAction = () => {
      closeDatepicker();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={filterPopupStyle}>
      <View
        style={{ ...filterPopupContainer, overflow: "hidden", maxHeight: 400 }}
      >
        <View style={filterHeader}>
          <H3>Datums</H3>

          <TouchableOpacity onPress={closeDatepicker}>
            <Ionicons
              name="ios-checkmark-sharp"
              style={{ fontSize: 28, color: accent3 }}
            />
          </TouchableOpacity>
        </View>

        <Calendar />
      </View>
    </View>
  );
};

export default DatepickerPopup;
