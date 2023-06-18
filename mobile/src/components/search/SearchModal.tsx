import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useCallback, useRef } from "react";
import {
  accent3,
  darkGray,
  primary700,
  primary800,
} from "../../constants/colors";
import { P, Strong } from "../../styles/text";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  AppInfo,
  selectApp,
  setMapSearchResults,
  setSearchCity,
  setSelectedCategories,
  setSelectedStartDate,
} from "../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import PullupModal from "../notification/PullupModal";
import { filterStyle } from "../home/HomeContainer";
import { setNotification } from "../../redux/slices/notificationSlice";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { getCities } from "../../requests/cityRequests";
import { formatDate } from "../../utils/formatDate";
import { getCityCategories } from "../../requests/categoryRequests";
import { MemoryInfo, selectMemory } from "../../redux/slices/memorySlice";

const SearchPullupModal = () => {
  const dispatch = useDispatch();

  const lastCatRef = useRef<any>(null);

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);
  const memoryInfo: MemoryInfo = useSelector(selectMemory);

  const openCityPopup = useCallback(async () => {
    if (!appInfo.cities) {
      getCities({
        dispatch,
        token: userInfo.token,
        country: appInfo.selectedCountry.id,
      });
    }

    dispatch(
      setNotification({
        type: "search_city_popup",
      })
    );
  }, [appInfo.cities]);

  const openCategoryPopup = useCallback(async () => {
    if (appInfo.searchCity && lastCatRef.current !== appInfo.searchCity.id) {
      lastCatRef.current = appInfo.searchCity.id;
      getCityCategories({
        city: appInfo.searchCity.id,
        dispatch,
        token: userInfo.token,
        memory: memoryInfo.categoryMemory,
      });
    }

    dispatch(
      setNotification({
        type: "category_popup",
      })
    );
  }, [appInfo.searchCity, lastCatRef.current]);

  const openDatepickerPopup = useCallback(async () => {
    dispatch(
      setNotification({
        type: "datepicker_popup",
      })
    );
  }, []);

  const clearFilters = () => {
    dispatch(setSearchCity(null));
    dispatch(setSelectedCategories([]));
    dispatch(setSelectedStartDate(null));
    dispatch(setMapSearchResults(null));
  };

  return (
    <PullupModal
      title="Meklēšanas filtri"
      snapPoints={["25%", "40%"]}
      opened={appInfo.filterMapEvents}
    >
      <View style={styles.filterContainer}>
        <View style={styles.filterSelector}>
          <Strong style={styles.filterName}>Pilsēta</Strong>

          <TouchableOpacity style={styles.filterOpener} onPress={openCityPopup}>
            <Strong style={styles.filterText}>
              {appInfo.searchCity ? appInfo.searchCity.name : "Izvēlēties"}
            </Strong>

            <Ionicons name="chevron-down" style={styles.filterIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterSelector}>
          <Strong style={styles.filterName}>Kategorijas</Strong>

          <TouchableOpacity
            style={styles.filterOpener}
            onPress={openCategoryPopup}
          >
            <Strong style={styles.filterText}>
              {appInfo.selectedCategories.length > 0
                ? `${appInfo.selectedCategories.length} izvēlētas`
                : "Izvēlēties"}
            </Strong>

            <Ionicons name="chevron-down" style={styles.filterIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterSelector}>
          <Strong style={styles.filterName}>Datums</Strong>

          <TouchableOpacity
            style={styles.filterOpener}
            onPress={openDatepickerPopup}
          >
            <Strong style={styles.filterText}>
              {appInfo.selectedStartDate && appInfo.selectedEndDate
                ? `${formatDate(appInfo.selectedStartDate)} - ${formatDate(
                    appInfo.selectedEndDate
                  )}`
                : appInfo.selectedStartDate
                ? `No ${formatDate(appInfo.selectedStartDate)}`
                : "Izvēlēties"}
            </Strong>

            <Ionicons name="chevron-down" style={styles.filterIcon} />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "flex-start" }}>
          <TouchableOpacity
            style={{ marginTop: 5, paddingVertical: 10 }}
            onPress={clearFilters}
          >
            <P
              style={{
                color: accent3,
                fontSize: 16,
              }}
            >
              Noņemt filtrus
            </P>
          </TouchableOpacity>
        </View>
      </View>
    </PullupModal>
  );
};

export default SearchPullupModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    position: "relative",
  },
  container: {
    width: "100%",
    padding: 10,
  },
  categoryContainer: {
    width: "100%",
    height: "100%",
    paddingBottom: 20,
    marginTop: 10,
  },
  filterContainer: {
    width: "100%",
    paddingBottom: 20,
  },
  filterSelector: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  filterName: {
    fontSize: 18,
    color: darkGray,
  },
  filterText: {
    color: accent3,
    fontSize: 16,
  },
  filterIcon: {
    fontSize: 18,
    color: accent3,
  },
  filterOpener: {
    ...filterStyle,
    height: "auto",
    paddingVertical: 4,
    width: 130,
  },
  filterButton: {
    backgroundColor: primary800,
    borderWidth: 2,
    borderColor: primary700,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export const filterButtonStyle = styles.filterButton;
