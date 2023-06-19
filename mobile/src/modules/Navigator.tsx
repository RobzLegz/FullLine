import React, { useEffect, useRef } from "react";
import HomeScreen from "../screens/Home";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../redux/slices/appSlice";
import { selectUser, UserInfo } from "../redux/slices/userSlice";
import { authUser } from "../requests/userRequests";
import { createStackNavigator } from "@react-navigation/stack";
import { getCategories } from "../requests/categoryRequests";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);

  const receivedUserInfo = useRef(false);
  const receivedCategoryInfo = useRef(false);
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
      !appInfo.categories &&
      userInfo.token &&
      !receivedCategoryInfo.current
    ) {
      receivedCategoryInfo.current = true;
      getCategories({
        dispatch,
        token: userInfo.token,
      });
    }
  }, [userInfo.token, appInfo.categories, userInfo.info?.id]);

  useEffect(() => {
    if (
      appInfo.categories &&
      userInfo.info &&
      fontsLoaded &&
      !splashScreenHidden.current
    ) {
      splashScreenHidden.current = true;
      SplashScreen.hideAsync();
    }
  }, [userInfo.info, fontsLoaded, appInfo.categories]);

  if (!userInfo.info || !appInfo.categories || !fontsLoaded) {
    return null;
  }

  console.log(appInfo.categories);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
