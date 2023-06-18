import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { H1, Strong } from "../../styles/text";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formatCityName } from "../../utils/formatCityName";
import { accent3, white } from "../../constants/colors";
import { getCities } from "../../requests/cityRequests";
import { AppInfo, selectApp, setPopmodal } from "../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import {
  NotificationInfo,
  selectNotification,
  setNotification,
} from "../../redux/slices/notificationSlice";
import FeedSection from "./FeedSection";
import { useNavigation } from "@react-navigation/native";
import { getSearchCategories } from "../../requests/categoryRequests";
import { FlashList } from "@shopify/flash-list";
import TooManyFilters from "../notification/TooManyFilters";
import { getCountries } from "../../requests/countryRequests";
import GlobalLoader from "../notification/GlobalLoader";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  const navigateToSearch = async () => {
    dispatch(setPopmodal(0));

    navigation.navigate({
      name: "Search",
    });

    if (!appInfo.searchCategories) {
      getSearchCategories({ dispatch, token: userInfo.token });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <H1>Pasākumi</H1>

          <TouchableOpacity onPress={navigateToSearch}>
            <Ionicons name="search" style={{ fontSize: 28, color: white }} />
          </TouchableOpacity>
        </View>
      </View>

      <LocationFilters />

      {appInfo.feed && appInfo.feed.length > 0 ? (
        <View style={styles.eventContainer}>
          <FlashList
            data={appInfo.feed}
            renderItem={({ item }) => <FeedSection {...item} />}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
          />
        </View>
      ) : null}

      {appInfo.recomendations && appInfo.recomendations.length > 0 ? (
        <View style={styles.eventContainer}>
          <FlashList
            data={appInfo.recomendations}
            renderItem={({ item }) => <FeedSection {...item} />}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
          />
        </View>
      ) : null}

      {(appInfo.feed && appInfo.feed.length > 0) ||
      (appInfo.recomendations && appInfo.recomendations.length > 0) ? (
        <H1 style={{ color: accent3, marginBottom: 5, marginLeft: 5 }}>
          {formatCityName(appInfo.selectedCity.name)}
        </H1>
      ) : null}

      {appInfo.feedEvents && appInfo.feedEvents.length > 0 ? (
        <View style={styles.eventContainer}>
          <FlashList
            data={appInfo.feedEvents}
            renderItem={({ item }) => <FeedSection {...item} />}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
          />
        </View>
      ) : notificationInfo.type === "modal_loading" ? null : (
        <View style={{ paddingBottom: 30 }}>
          <TooManyFilters msg="Šajā pilsētā pasākumi netika atrasti :(" />
        </View>
      )}
    </ScrollView>
  );
};

export default HomeContainer;

const LocationFilters = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);

  const openCityPopup = useCallback(async () => {
    dispatch(setNotification({ type: "city_popup" }));

    if (
      !appInfo.cities?.some(
        (cit) => cit.countryId === appInfo.selectedCountry.id
      )
    ) {
      await getCities({
        dispatch,
        token: userInfo.token,
        country: appInfo.selectedCountry.id,
      });
    }
  }, [appInfo.cities, appInfo.selectedCountry.id, userInfo.token]);

  const openCountryPopup = useCallback(async () => {
    dispatch(setNotification({ type: "country_popup" }));

    if (!appInfo.countries) {
      await getCountries({ dispatch, token: userInfo.token });
    }
  }, [appInfo.countries]);

  return (
    <View style={styles.locationFilters}>
      <TouchableOpacity
        style={{
          ...styles.cityFilter,
          justifyContent: "center",
          marginRight: 4,
          flex: 0,
          paddingHorizontal: 10,
        }}
        onPress={openCountryPopup}
      >
        {appInfo.selectedCountry.flag && (
          <View
            style={{
              borderRadius: 2,
              overflow: "hidden",
              width: 30,
              height: 20,
              marginRight: 4,
            }}
          >
            <Image
              source={{ uri: appInfo.selectedCountry.flag }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </View>
        )}

        <Strong
          style={{
            color: accent3,
            fontSize: 16,
          }}
        >
          {appInfo.selectedCountry.short}
        </Strong>

        <Ionicons
          name="chevron-down"
          style={{ fontSize: 18, color: accent3 }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.cityFilter, flex: 1 }}
        onPress={openCityPopup}
      >
        <Strong
          style={{
            color: accent3,
            fontSize: 16,
          }}
        >
          {formatCityName(appInfo.selectedCity.name)}
        </Strong>

        <Ionicons
          name="chevron-down"
          style={{ fontSize: 18, color: accent3 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  locationFilters: {
    flexDirection: "row",
    marginBottom: 20,
  },
  header: {
    width: "100%",
    paddingVertical: 10,
    marginBottom: 5,
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: accent3,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 5,
    paddingLeft: 7,
    paddingRight: 5,
  },
  eventContainer: {
    width: "100%",
  },
});

export const filterStyle = styles.cityFilter;
