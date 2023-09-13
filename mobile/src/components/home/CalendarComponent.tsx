import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getCalendar, monthNames } from "../../utils/getCalendar";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { H3, Strong } from "../../styles/text";

const CalendarComponent = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.categories) {
    return null;
  }

  const calendar = getCalendar(appInfo.categories);

  console.log(calendar);

  return (
    <View style={styles.container}>
      <FlashList
        data={calendar}
        renderItem={({ item, index }) => (
          <MonthView index={index} data={item} />
        )}
      />
    </View>
  );
};

export default CalendarComponent;

const MonthView: React.FC<{
  data: {
    date: Date;
    color: string;
  }[];
  index: number;
}> = ({ index, data }) => {
  return (
    <View style={{ width: "100%" }}>
      <Strong>{monthNames[data[0].date.getMonth()]}</Strong>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 30,
  },
});
