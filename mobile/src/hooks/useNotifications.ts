import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import { registerForPushNotifications } from "../requests/userRequests";
import { UserInfo, selectUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToastNotification } from "../redux/slices/notificationSlice";
import { useNavigation } from "@react-navigation/native";
import { getCategoryById } from "../requests/categoryRequests";
import { getEventById } from "../requests/eventRequests";
import { getSpotById } from "../requests/spotRequests";
import { getOrganizerById } from "../requests/organizerRequests";
import { ExUser } from "../interfaces/backendTypes";
import { getItemFromStore } from "../utils/storeOptions";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const registerForPushNotificationsAsync = async (
    userToken: string,
    userInfo: ExUser
  ) => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (token && token !== userInfo.push_notification_token) {
      registerForPushNotifications({
        pushToken: token,
        token: userToken,
        dispatch,
      });
    }
  };

  const handleNotification = (
    notification: Notifications.Notification,
    token: string | null
  ) => {
    if (!token) {
      return;
    }

    const { title, body, data } = notification.request.content;

    const { spotId, eventId, categoryId, organizerId } = data;

    let fun = undefined;

    if (categoryId && typeof categoryId === "string") {
      fun = async () => {
        navigation.navigate("Category");

        await getCategoryById({
          dispatch,
          token: token,
          id: categoryId,
        });
      };
    } else if (eventId && typeof eventId === "string") {
      fun = async () => {
        navigation.navigate("Event");

        await getEventById({
          dispatch,
          token: token,
          id: eventId,
        });
      };
    } else if (spotId && typeof spotId === "string") {
      fun = async () => {
        navigation.navigate("Spot");

        await getSpotById({
          dispatch,
          token: token,
          id: spotId,
        });
      };
    } else if (organizerId && typeof organizerId === "string") {
      fun = async () => {
        navigation.navigate("Organizer");

        await getOrganizerById({
          dispatch,
          token: token,
          id: organizerId,
        });
      };
    }

    dispatch(
      setToastNotification({ type: "popup", title, message: body, fun })
    );

    return notification;
  };

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  const handleNotificationResponse = async (
    response: Notifications.NotificationResponse
  ) => {
    const data: {
      spotId?: string;
      eventId?: string;
      categoryId?: string;
      organizerId?: string;
    } = response.notification.request.content.data;
    const { spotId, eventId, categoryId, organizerId } = data;

    const tokenJSON = await getItemFromStore("token");

    if (!tokenJSON) {
      return;
    }

    const parsed = JSON.parse(tokenJSON);

    const tok = parsed.token;

    if (categoryId && typeof categoryId === "string") {
      navigation.navigate("Category");

      getCategoryById({
        dispatch,
        token: tok,
        id: categoryId,
      });
    } else if (eventId && typeof eventId === "string") {
      navigation.navigate("Event");

      getEventById({
        dispatch,
        token: tok,
        id: eventId,
      });
    } else if (spotId && typeof spotId === "string") {
      navigation.navigate("Spot");

      getSpotById({
        dispatch,
        token: tok,
        id: spotId,
      });
    } else if (organizerId && typeof organizerId === "string") {
      navigation.navigate("Organizer");

      getOrganizerById({
        dispatch,
        token: tok,
        id: organizerId,
      });
    }
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
  };
};
