import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  selectCategory,
} from "../../redux/slices/appSlice";
import {
  NotificationInfo,
  clearNotification,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import NotificationContainer from "./NotificationContainer";

const Categories = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  const categoryData = useMemo(() => {
    if (notificationInfo.params?.spot) {
      return appInfo.categories?.filter((cat) => cat.type === "Spot");
    }

    return appInfo.categories?.filter((cat) => cat.type === "Event");
  }, [notificationInfo.params?.spot, appInfo.categories]);

  return (
    <NotificationContainer>
      <div className="p-2">
        <strong className="flex-auto font-semibold text-gray-500 text-2xl">
          Kategorijas
        </strong>

        <div className="w-full flex flex-wrap gap-2 mt-2 max-h-[400px] overflow-y-auto">
          {categoryData
            ? categoryData.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`border px-2 rounded-full disabled:opacity-50 ${
                    appInfo.selectedCategories.some(
                      (cat) => cat.id === category.id
                    )
                      ? "text-white"
                      : ""
                  }`}
                  style={
                    appInfo.selectedCategories.some(
                      (cat) => cat.id === category.id
                    )
                      ? {
                          backgroundColor: category.color,
                        }
                      : {}
                  }
                  onClick={() => dispatch(selectCategory(category.id))}
                  disabled={
                    appInfo.selectedCategories.length >= 3 &&
                    !appInfo.selectedCategories.some(
                      (cat) => cat.id === category.id
                    )
                  }
                >
                  {category.name}
                </button>
              ))
            : null}
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-4 border-t pt-2">
        <p className="text-accent">
          {appInfo.selectedCategories.length} / 3 izvēlētas
        </p>

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

export default Categories;
