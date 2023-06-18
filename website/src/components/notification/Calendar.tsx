import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  parse,
  startOfToday,
  isEqual,
  getDay,
  isSameDay,
} from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp, setStartDate } from "../../redux/slices/appSlice";
import { clearNotification } from "../../redux/slices/notificationSlice";
import { formatDate } from "../../utils/formatDate";
import NotificationContainer from "./NotificationContainer";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface CalendarDayProps {
  index: number;
  day: Date;
  inactive?: boolean;
}

const today = startOfToday();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const [currentMonth, setCurrentMonth] = useState(
    format(startOfToday(), "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const selectDay = (day: Date) => {
    dispatch(setStartDate(String(day)));
  };

  const CalendarDay: React.FC<CalendarDayProps> = ({ day, index }) => {
    const selected =
      (appInfo.startDate && isEqual(day, new Date(appInfo.startDate))) ||
      (appInfo.endDate && isEqual(day, new Date(appInfo.endDate)));

    const between =
      appInfo.startDate &&
      appInfo.endDate &&
      day > new Date(appInfo.startDate) &&
      day < new Date(appInfo.endDate);

    return (
      <button
        type="button"
        disabled={day < today}
        onClick={() => selectDay(day)}
        className={classNames(
          index === 0 && colStartClasses[getDay(day)],
          "py-1.5",
          "disabled:opacity-40"
        )}
      >
        <div
          className={classNames(
            "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
            between
              ? "text-accent"
              : selected
              ? "bg-accent text-primary-100"
              : ""
          )}
        >
          <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
        </div>
      </button>
    );
  };

  return (
    <NotificationContainer>
      <div className="flex items-center w-full px-2">
        <strong className="flex-auto font-semibold text-gray-500 text-2xl">
          {translatedMonths[firstDayCurrentMonth.getMonth()]}{" "}
          {firstDayCurrentMonth.getFullYear()}
        </strong>

        <button
          type="button"
          onClick={previousMonth}
          className={`-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-500`}
        >
          <span className="sr-only">Previous month</span>

          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>

          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500 w-full">
        <div className="text-gray-500">P</div>
        <div className="text-gray-500">O</div>
        <div className="text-gray-500">T</div>
        <div className="text-gray-500">C</div>
        <div className="text-gray-500">P</div>
        <div className="text-gray-500">S</div>
        <div className="text-gray-500">Sv</div>
      </div>

      <div className="grid grid-cols-7 mt-2 text-sm w-full">
        {days.map((day, i) => (
          <CalendarDay key={i} day={day} index={i} />
        ))}
      </div>

      <div className="flex items-center justify-between w-full px-4 border-t pt-2">
        {appInfo.startDate && appInfo.endDate ? (
          <p className="text-accent">
            {formatDate(appInfo.startDate)}
            {" - "}
            {formatDate(appInfo.endDate)}
          </p>
        ) : appInfo.startDate ? (
          <p className="text-accent">{formatDate(appInfo.startDate)}</p>
        ) : (
          <div />
        )}

        <button
          className="form_button w-14 h-8 rounded-md m-0"
          onClick={() => dispatch(clearNotification())}
        >
          Ok
        </button>
      </div>
    </NotificationContainer>
  );
};

export const colStartClasses = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

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

export default Calendar;
