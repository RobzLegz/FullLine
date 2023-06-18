import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Strong } from "../../styles/text";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  accent3,
  black,
  darkGray,
  primary700,
  white,
} from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  setSelectedStartDate,
} from "../../redux/slices/appSlice";
import {
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  startOfDate,
  startOfMonth,
} from "../../utils/spot_date";

interface CalendarDayProps {
  day?: Date | string;
}

const yesterday = startOfDate();
yesterday.setDate(yesterday.getDate() - 1);
const monthStart = startOfMonth();

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(monthStart);
  const [days, setDays] = useState<(Date | string)[]>([
    "Pi",
    "Ot",
    "Tr",
    "Ce",
    "Pk",
    "Se",
    "Sv",
    ...new Array(
      currentMonth.getDay() - 1 >= 0 ? currentMonth.getDay() - 1 : 0
    ),
    ...eachDayOfInterval(currentMonth, endOfMonth(currentMonth)),
  ]);

  const previousMonth = () => {
    const firstDayPrevMonth = currentMonth;
    firstDayPrevMonth.setMonth(firstDayPrevMonth.getMonth() - 1);
    setCurrentMonth(firstDayPrevMonth);
    setDays([
      "Pi",
      "Ot",
      "Tr",
      "Ce",
      "Pk",
      "Se",
      "Sv",
      ...new Array(
        firstDayPrevMonth.getDay() - 1 >= 0 ? firstDayPrevMonth.getDay() - 1 : 0
      ),
      ...eachDayOfInterval(firstDayPrevMonth, endOfMonth(firstDayPrevMonth)),
    ]);
  };

  const nextMonth = () => {
    const firstDayNextMonth = currentMonth;
    firstDayNextMonth.setMonth(firstDayNextMonth.getMonth() + 1);
    setCurrentMonth(firstDayNextMonth);
    setDays([
      "Pi",
      "Ot",
      "Tr",
      "Ce",
      "Pk",
      "Se",
      "Sv",
      ...new Array(
        firstDayNextMonth.getDay() - 1 >= 0 ? firstDayNextMonth.getDay() - 1 : 0
      ),
      ...eachDayOfInterval(firstDayNextMonth, endOfMonth(firstDayNextMonth)),
    ]);
  };

  return (
    <View
      style={{
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={previousMonth} style={styles.navigation}>
          <Ionicons
            name="chevron-back"
            style={{ fontSize: 20, color: darkGray }}
          />
        </TouchableOpacity>

        <Strong style={{ color: darkGray }}>
          {translatedMonths[currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </Strong>

        <TouchableOpacity onPress={nextMonth} style={styles.navigation}>
          <Ionicons
            name="chevron-forward"
            style={{ fontSize: 20, color: darkGray }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          height: "100%",
          marginTop: 10,
          position: "relative",
          //   alignItems: "center",
          //   paddingLeft: 20,
        }}
      >
        <FlashList
          numColumns={7.5}
          data={days}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          estimatedItemSize={45}
          renderItem={({ item }) => <CalendarDay day={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: darkGray,
  },
});

export const colStartClasses = [0, 0, 1, 2, 3, 4, 5, 6];

const translatedMonths = [
  "Janvāris",
  "Februāris",
  "Marts",
  "Aprīlis",
  "Maijs",
  "Jūnijs",
  "Jūlijs",
  "Augusts",
  "Septembris",
  "Oktobris",
  "Novembris",
  "Decembris",
];

const CalendarDay: React.FC<CalendarDayProps> = ({ day }) => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const selectDay = () => {
    dispatch(setSelectedStartDate(day));
  };

  return (
    <View
      style={{
        flex: 1,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        margin: 2,
      }}
    >
      {typeof day === "string" ? (
        <Strong style={{ color: darkGray, fontSize: 16 }}>{day}</Strong>
      ) : day ? (
        <TouchableOpacity
          onPress={selectDay}
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            width: "100%",
            height: "100%",
            opacity: day < yesterday ? 0.3 : 1,
            backgroundColor:
              (appInfo.selectedStartDate &&
                isSameDay(appInfo.selectedStartDate, day)) ||
              (appInfo.selectedEndDate &&
                isSameDay(appInfo.selectedEndDate, day))
                ? accent3
                : primary700,
            borderRadius: 8,
          }}
          disabled={day < yesterday}
        >
          <Strong
            style={{
              color:
                (appInfo.selectedStartDate &&
                  isSameDay(appInfo.selectedStartDate, day)) ||
                (appInfo.selectedEndDate &&
                  isSameDay(appInfo.selectedEndDate, day))
                  ? white
                  : appInfo.selectedStartDate &&
                    appInfo.selectedEndDate &&
                    day < appInfo.selectedEndDate &&
                    day > appInfo.selectedStartDate
                  ? accent3
                  : darkGray,
              fontSize: 16,
            }}
          >
            {day.getDate()}
          </Strong>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Calendar;
