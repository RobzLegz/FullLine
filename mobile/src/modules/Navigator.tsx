import React, { useEffect, useRef, useState } from "react";
import MapScreen from "../screens/Map";
import HomeScreen from "../screens/Home";
import MyEventsScreen from "../screens/MyEvents";
import { useDispatch, useSelector } from "react-redux";
import EventScreen from "../screens/Event";
import {
  AppInfo,
  selectApp,
  setFilterMapEvents,
  setPopmodal,
  setSearchCity,
  setSelectedCategories,
  setSelectedStartDate,
} from "../redux/slices/appSlice";
import { selectUser, UserInfo } from "../redux/slices/userSlice";
import { authUser } from "../requests/userRequests";
import {
  getFeed,
  getFeedEvents,
  getRecomendations,
} from "../requests/feedRequests";
import SearchScreen from "../screens/Search";
import CategoryScreen from "../screens/Category";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { accent3, primary500, primary900 } from "../constants/colors";
import {
  getSearchCategories,
  getSpotCategories,
} from "../requests/categoryRequests";
import { getMapEvents, getSavedEvents } from "../requests/eventRequests";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { clearNotification } from "../redux/slices/notificationSlice";
import OrganizerScreen from "../screens/Organizer";
import { getMapSpots } from "../requests/spotRequests";
import NearbySearchScreen from "../screens/NearbySearchScreen";
import SpotScreen from "../screens/Spot";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../hooks/useNotifications";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);

  const receivedUserInfo = useRef(false);
  const receivedFeedInfo = useRef(false);
  const receivedFeedEventInfo = useRef(false);
  const recomendationsReceived = useRef(false);
  const splashScreenHidden = useRef(false);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  });

  useEffect(() => {
    if (!userInfo.token && !receivedUserInfo.current) {
      receivedUserInfo.current = true;
      authUser({ dispatch });
    }

    if (
      userInfo.token &&
      !appInfo.feedEvents &&
      !receivedFeedEventInfo.current
    ) {
      receivedFeedEventInfo.current = true;
      getFeedEvents({
        dispatch,
        token: userInfo.token,
      });
    }

    if (
      userInfo.token &&
      userInfo.info?.id &&
      !appInfo.recomendations &&
      !recomendationsReceived.current
    ) {
      recomendationsReceived.current = true;
      getRecomendations({
        dispatch,
        token: userInfo.token,
        id: userInfo.info.id,
      });
    }

    if (!appInfo.feed && userInfo.token && !receivedFeedInfo.current) {
      receivedFeedInfo.current = true;
      getFeed({
        dispatch,
        token: userInfo.token,
      });
    }
  }, [userInfo.token, appInfo.feed, dispatch, userInfo.info?.id]);

  useEffect(() => {
    if (
      appInfo.feed &&
      userInfo.info &&
      appInfo.feedEvents &&
      fontsLoaded &&
      !splashScreenHidden.current
    ) {
      setTimeout(() => {
        splashScreenHidden.current = true;
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [appInfo.feed, dispatch, userInfo.info, fontsLoaded, appInfo.feedEvents]);

  const handleSearchPress = () => {
    dispatch(setPopmodal(0));
    dispatch(clearNotification());
    dispatch(setFilterMapEvents(0));

    dispatch(setSearchCity(null));
    dispatch(setSelectedCategories([]));
    dispatch(setSelectedStartDate(null));

    if (!appInfo.searchCategories && userInfo.token) {
      getSearchCategories({ dispatch, token: userInfo.token });
    }
  };

  const handleMapPress = () => {
    dispatch(setPopmodal(0));
    dispatch(clearNotification());
    dispatch(setFilterMapEvents(0));

    dispatch(setSearchCity(null));
    dispatch(setSelectedCategories([]));
    dispatch(setSelectedStartDate(null));

    if (!appInfo.mapSpots && userInfo.token) {
      getMapSpots({
        dispatch,
        token: userInfo.token,
        country: appInfo.selectedCountry.id,
      });
    }

    if (!appInfo.mapEvents && userInfo.token) {
      getMapEvents({
        dispatch,
        token: userInfo.token,
        country: appInfo.selectedCountry.id,
      });
    }

    if (!appInfo.spotCategories && userInfo.token) {
      getSpotCategories({
        dispatch,
        token: userInfo.token,
      });
    }
  };

  const handleSavedEventsPress = () => {
    if (!appInfo.savedEvents && userInfo.token) {
      dispatch(clearNotification());
      getSavedEvents({ dispatch, token: userInfo.token });
    }
  };

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const pushTokenRegistered = useRef<boolean>(false);

  const {
    registerForPushNotificationsAsync,
    handleNotificationResponse,
    handleNotification,
  } = useNotifications();

  useEffect(() => {
    if (!pushTokenRegistered.current && userInfo.token && userInfo.info) {
      pushTokenRegistered.current = true;
      registerForPushNotificationsAsync(userInfo.token, userInfo.info);
    }
  }, [userInfo.token, userInfo.info]);

  useEffect(() => {
    if (!userInfo.token) {
      return;
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notif) =>
        handleNotification(notif, userInfo.token)
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [userInfo.token]);

  if (!userInfo.info || !appInfo.feed || !fontsLoaded || !appInfo.feedEvents) {
    return null;
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Map") {
            iconName = focused ? "map-marker-circle" : "map-marker-circle";
          } else if (rn === "Search") {
            iconName = focused ? "magnify" : "magnify";
          } else if (rn === "MyEvents") {
            iconName = focused ? "calendar-star" : "calendar-star";
          }

          if (!iconName) {
            return null;
          }

          return (
            <MaterialCommunityIcon name={iconName} size={28} color={color} />
          );
        },
        tabBarActiveBackgroundColor: primary900,
        tabBarInactiveBackgroundColor: primary900,
        tabBarActiveTintColor: accent3,
        tabBarInactiveTintColor: primary500,
        tabBarLabelStyle: {
          fontSize: 10,
          display: "none",
        },
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Sākums",
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "Karte",
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
        listeners={{
          tabPress: handleMapPress,
        }}
      />
      <Tab.Screen
        name="NearbySearch"
        component={NearbySearchScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Meklēt",
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
        listeners={{
          tabPress: handleSearchPress,
        }}
      />

      <Tab.Screen
        name="MyEvents"
        component={MyEventsScreen}
        options={{
          tabBarLabel: "Saglabātie",
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
        listeners={{
          tabPress: handleSavedEventsPress,
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Spot"
        component={SpotScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Organizer"
        component={OrganizerScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
