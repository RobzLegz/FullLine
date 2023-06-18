import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  accent3,
  darkGray,
  primary700,
  primary800,
  white,
} from "../../constants/colors";
import { H3, P, Strong } from "../../styles/text";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import {
  AppInfo,
  selectApp,
  setFilterMapEvents,
  setPopmodal,
  setSearchResults,
} from "../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchCategoryCard from "../categories/SearchCategoryCard";
import {
  NotificationInfo,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { searchEvents } from "../../requests/eventRequests";
import EventCard from "../event/EventCard";
import TooManyFilters from "../notification/TooManyFilters";
import Search from "../ui/Search";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { navigateToNearbySearch } from "../../utils/getCoords";
import SearchPullupModal, { filterButtonStyle } from "./SearchModal";

const SearchScreenContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    await searchEvents({
      dispatch,
      token: userInfo.token,
      city: appInfo.searchCity?.id,
      query: search,
      categories: appInfo.selectedCategories,
      startDate: appInfo.selectedStartDate,
      endDate: appInfo.selectedEndDate,
    });
  };

  useEffect(() => {
    if (
      !notificationInfo.type &&
      (appInfo.searchCity ||
        appInfo.selectedStartDate ||
        appInfo.selectedEndDate ||
        appInfo.selectedCategories.length > 0)
    ) {
      handleSearch();
    }
  }, [
    appInfo.searchCity,
    appInfo.selectedStartDate,
    appInfo.selectedEndDate,
    appInfo.selectedCategories,
    notificationInfo.type,
  ]);

  const closeSearchResults = () => {
    setSearch("");
    dispatch(setSearchResults(null));
  };

  const handleNavigatePress = async () => {
    await navigateToNearbySearch(dispatch, navigation);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <H3 style={{ marginVertical: 15 }}>Meklēt</H3>

        <Search
          placeholder="Kā vēlies izklaidēties?"
          onChangeText={(text) => setSearch(text)}
          value={search}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          placeholderTextColor={darkGray}
          showClose={appInfo.searchResults ? true : false}
          closeFunction={closeSearchResults}
        />

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Strong>{appInfo.searchResults ? "Rezultāti" : "Kategorijas"}</Strong>

          <View style={{ flexDirection: "row" }}>
            {!appInfo.searchResults && (
              <TouchableOpacity
                style={{
                  ...filterButtonStyle,
                  borderRadius: 15,
                  width: 30,
                  height: 30,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  justifyContent: "center",
                  borderColor: primary700,
                  marginRight: 5,
                }}
                onPress={handleNavigatePress}
                activeOpacity={1}
              >
                <MaterialIcons name="my-location" size={14} color={accent3} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                ...filterButtonStyle,
                borderColor: primary700,
                backgroundColor:
                  appInfo.searchCity ||
                  appInfo.selectedCategories.length > 0 ||
                  appInfo.selectedStartDate
                    ? accent3
                    : primary800,
                borderWidth:
                  appInfo.searchCity ||
                  appInfo.selectedCategories.length > 0 ||
                  appInfo.selectedStartDate
                    ? 0
                    : 2,
              }}
              onPress={() =>
                dispatch(setFilterMapEvents(appInfo.filterMapEvents + 1))
              }
            >
              <Ionicons
                style={{
                  fontSize: 14,
                  marginRight: 4,
                  color: white,
                }}
                name="ios-filter"
              />

              <P
                style={{
                  color: white,
                }}
              >
                Filtri
              </P>
            </TouchableOpacity>
          </View>
        </View>

        {appInfo.searchResults ? (
          <SearchResultContainer />
        ) : appInfo.searchCategories ? (
          <SearchCategoryContainer />
        ) : null}
      </ScrollView>

      <SearchPullupModal />
    </View>
  );
};

export default SearchScreenContainer;

const SearchCategoryContainer = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <View style={styles.categoryContainer}>
      <FlashList
        data={appInfo.searchCategories}
        numColumns={2}
        renderItem={({ item }) => <SearchCategoryCard {...item} />}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const SearchResultContainer = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.searchResults) {
    return null;
  }

  return (
    <View style={styles.categoryContainer}>
      {appInfo.searchResults.length > 0 ? (
        <FlashList
          data={appInfo.searchResults}
          renderItem={({ item }) => <EventCard {...item} />}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <TooManyFilters />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
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
});
