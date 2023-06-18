import * as Location from "expo-location";
import { setCoords } from "../redux/slices/appSlice";

export const getCoords = async (dispatch?: any) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return null;
  }

  const { coords } = await Location.getCurrentPositionAsync({});

  const { latitude: lat, longitude: lng } = coords;

  if (dispatch) {
    dispatch(
      setCoords({
        lat,
        lng,
      })
    );
  }

  return {
    lat,
    lng,
  };
};

export const navigateToNearbySearch = async (
  dispatch: any,
  navigation: any
) => {
  const coords = await getCoords(dispatch);

  if (!coords || !coords.lat || !coords.lng) {
    return;
  }

  navigation.navigate("NearbySearch");
};
