import React, { useEffect, useRef, useState } from "react";
import HomeScreen from "../screens/Home";
import CameraScreen from "../screens/Camera";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../redux/slices/appSlice";
import { selectUser, UserInfo } from "../redux/slices/userSlice";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { getImages } from "../utils/data";

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
    getImages();
  }, [userInfo.token, appInfo.categories, userInfo.info?.id]);

  useEffect(() => {
    if (fontsLoaded && !splashScreenHidden.current) {
      splashScreenHidden.current = true;
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
