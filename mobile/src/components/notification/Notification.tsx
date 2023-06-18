import { useSelector } from "react-redux";
import {
  NotificationInfo,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import CategoryPopup from "./CategoryPopup";
import CityPopup from "./CityPopup";
import DatepickerPopup from "./DatepickerPopup";
import GlobalLoader from "./GlobalLoader";
import ToastNotification from "./ToastNotification";

const Notification: React.FC = () => {
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  if (notificationInfo.type === "category_popup") {
    return <CategoryPopup />;
  }

  if (
    notificationInfo.type === "city_popup" ||
    notificationInfo.type === "search_city_popup"
  ) {
    return <CityPopup />;
  }

  if (notificationInfo.type === "country_popup") {
    return <CityPopup country />;
  }

  if (notificationInfo.type === "modal_loading") {
    return <GlobalLoader />;
  }

  if (notificationInfo.type === "datepicker_popup") {
    return <DatepickerPopup />;
  }

  return null;
};

export default Notification;
