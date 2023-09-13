import { StyleSheet, View } from "react-native";
import React from "react";
import { getCalendar, monthNames } from "../../utils/getCalendar";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { Strong } from "../../styles/text";
import { darkGray, white } from "../../constants/colors";

const CalendarComponent = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.categories) {
    return null;
  }

  const calendar = getCalendar(appInfo.categories);

  return (
    <View style={styles.container}>
      <FlashList
        data={calendar}
        renderItem={({ item, index }) => (
          <MonthView index={index} data={item} />
        )}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={300}
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
    <View style={{ width: "100%", marginBottom: 10 }}>
      <Strong style={{ color: darkGray, marginBottom: 4 }}>
        {monthNames[data[0].date.getMonth()]}
      </Strong>

      <FlashList
        data={data}
        renderItem={({ item }) => <DayView item={item} />}
        numColumns={7}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={40}
      />
    </View>
  );
};

const DayView: React.FC<{
  item: {
    date: Date;
    color: string;
  };
}> = ({ item }) => {
  return (
    <View
      style={{
        width: "100%",
        padding: 2,
        height: 32,
      }}
    >
      <View
        style={{
          backgroundColor: item.color,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          opacity: item.date > new Date() ? 0.3 : 1,
        }}
      >
        <Strong
          style={{
            color:
              item.color === "#6A6FF1" || item.color === "#68C8F1"
                ? white
                : darkGray,
          }}
        >
          {item.date.getDate()}
        </Strong>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 30,
    paddingBottom: 160,
  },
});
