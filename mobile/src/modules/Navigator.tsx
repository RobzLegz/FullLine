import React, { useEffect, useRef } from "react";
import HomeScreen from "../screens/Home";
import CategoryScreen from "../screens/Category";
import CameraScreen from "../screens/Camera";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import loadStateFromMMKV from "../loaders/mmkvLoader";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../redux/slices/appSlice";
import TutorialScreen from "../screens/Tutorial";
import { getCalendar } from "../utils/getCalendar";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const splashScreenHidden = useRef(false);
  const stateLoaded = useRef(false);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded && stateLoaded.current && !splashScreenHidden.current) {
      splashScreenHidden.current = true;
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, stateLoaded.current]);

  useEffect(() => {
    if (!stateLoaded.current) {
      loadStateFromMMKV(dispatch);

      stateLoaded.current = true;
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (appInfo.tutorialOpen) {
    return (
      <Stack.Navigator initialRouteName="Tutorial">
        <Stack.Screen
          name="Tutorial"
          component={TutorialScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
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

      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
