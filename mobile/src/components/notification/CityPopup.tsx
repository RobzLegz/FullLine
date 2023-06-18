import React, { memo, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { H3 } from "../../styles/text";
import PopupCity from "../cities/PopupCity";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  BackHandler,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NotificationInfo,
  clearNotification,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import { accent3, darkGray } from "../../constants/colors";
import {
  filterPopupStyle,
  filterPopupLoader,
  filterPopupContainer,
  filterHeader,
} from "./CategoryPopup";
import { ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Search from "../ui/Search";
import PopupCountry from "../cities/PopupCountry";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Props {
  country?: boolean;
}

const CityPopup: React.FC<Props> = memo(({ country = false }) => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  const [search, setSearch] = useState("");

  const closeCities = () => {
    dispatch(clearNotification());
  };

  useEffect(() => {
    const backAction = () => {
      closeCities();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    if (item?.flag) {
      return <PopupCountry {...item} />;
    }

    return <PopupCity {...item} />;
  };

  const cityData = useMemo(() => {
    if (
      !appInfo.cities?.some((c) => c.countryId === appInfo.selectedCountry.id)
    ) {
      return null;
    }

    const cities = appInfo.cities?.filter(
      (item) =>
        item.name.substring(0, search.length).toLowerCase() ===
          search.toLowerCase() &&
        (notificationInfo.type !== "city_popup" ||
          appInfo.selectedCountry.id === item.countryId)
    );

    return cities;
  }, [appInfo.cities, appInfo.selectedCountry.id, search]);

  return (
    <View style={{ ...filterPopupStyle }}>
      <View style={filterPopupContainer}>
        <View style={filterHeader}>
          <H3>{country ? "Valstis" : "Pilsētas"}</H3>

          <TouchableOpacity onPress={closeCities}>
            <Ionicons name="close" style={{ fontSize: 28, color: accent3 }} />
          </TouchableOpacity>
        </View>

        <Search
          containerStyle={styles.search}
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder={`Meklē ${
            country ? "valsti" : "pilsētu"
          } pēc nosaukuma...`}
          placeholderTextColor={darkGray}
          returnKeyType="search"
        />

        {!country && cityData ? (
          <View style={styles.cities}>
            <FlashList
              data={cityData}
              renderItem={renderItem}
              estimatedItemSize={40}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : country && appInfo.countries ? (
          <View style={styles.cities}>
            <FlashList
              data={appInfo.countries.filter(
                (item) =>
                  item.name.length >= search.length &&
                  item.name.substring(0, search.length).toLowerCase() ===
                    search.toLowerCase()
              )}
              renderItem={renderItem}
              estimatedItemSize={40}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={filterPopupLoader}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </View>
  );
});

export default CityPopup;

const styles = StyleSheet.create({
  search: {
    height: 40,
    marginVertical: 5,
  },
  cities: {
    width: "100%",
    height: SCREEN_HEIGHT - 175,
    position: "relative",
  },
});
