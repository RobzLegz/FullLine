import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getCalendar } from "../../utils/getCalendar";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";

const CalendarComponent = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.categories) {
    return null;
  }

  const calendar = getCalendar(appInfo.categories);

  console.log(calendar);

  return (
    <View>
      <Text>CalendarComponent</Text>
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({});
