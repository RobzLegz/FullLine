import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Camera, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyleDark } from "../../styles/mapStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  setCurrentEvent,
  setCurrentSpot,
  setFilterMapEvents,
  setModalEvents,
  setPopmodal,
} from "../../redux/slices/appSlice";
import { getEventById, getEventsByIds } from "../../requests/eventRequests";
import MapView from "react-native-map-clustering";
import { accent1, accent3, primary600, white } from "../../constants/colors";
import { BackHandler, StyleSheet, View, Platform, Image } from "react-native";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ExEvent, ExSpot } from "../../interfaces/backendTypes";
import { getSpotById } from "../../requests/spotRequests";

const MapComponent: React.FC = memo(() => {
  const dispatch = useDispatch();
  const mapRef = useRef<any>(null);

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);

  const [mapLoaded, setMapLoaded] = useState(false);

  const handleClustererPress = useCallback(
    async (_marker: typeof Marker, markers?: any[]) => {
      if (!markers || markers.length > 20) {
        return;
      }
      const ids = markers.map((m) => m.properties.id);
      dispatch(setFilterMapEvents(false));

      dispatch(setCurrentSpot(null));
      dispatch(setCurrentEvent(null));
      dispatch(setModalEvents(null));

      dispatch(setPopmodal(appInfo.popmodal + 1));

      getEventsByIds({
        ids: ids,
        dispatch,
        token: userInfo.token,
      });
    },
    [userInfo.token, appInfo.popmodal]
  );

  const handleEventPress = useCallback(
    async (id: string) => {
      dispatch(setFilterMapEvents(false));

      dispatch(setCurrentEvent(null));
      dispatch(setCurrentSpot(null));
      dispatch(setModalEvents(null));

      dispatch(setPopmodal(appInfo.popmodal + 1));

      getEventById({
        id: id,
        dispatch,
        token: userInfo.token,
      });
    },
    [userInfo.token, appInfo.popmodal]
  );

  const handleSpotPress = useCallback(
    async (id: string) => {
      dispatch(setFilterMapEvents(false));

      dispatch(setCurrentSpot(null));
      dispatch(setCurrentEvent(null));
      dispatch(setModalEvents(null));

      dispatch(setPopmodal(appInfo.popmodal + 1));

      getSpotById({
        id: id,
        dispatch,
        token: userInfo.token,
      });
    },
    [userInfo.token, appInfo.popmodal]
  );

  const hideModal = useCallback(() => {
    if (appInfo.popmodal > 0) {
      mapRef?.current?.getCamera().then((cam: Camera) => {
        cam.zoom = 12;
        mapRef?.current?.animateCamera(cam);
      });
      dispatch(setFilterMapEvents(false));
      dispatch(setPopmodal(0));
    }

    return true;
  }, [appInfo.popmodal]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      hideModal
    );

    return () => backHandler.remove();
  }, [appInfo.popmodal]);

  const PriorityMarker: React.FC<(ExSpot | ExEvent) & { event?: boolean }> = ({
    location,
    cover,
    id,
    event = false,
  }) => {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    const handlePress = useCallback(async () => {
      dispatch(setFilterMapEvents(false));

      dispatch(setCurrentEvent(null));
      dispatch(setCurrentSpot(null));
      dispatch(setPopmodal(appInfo.popmodal + 1));

      if (event) {
        getEventById({
          id: id,
          dispatch,
          token: userInfo.token,
        });
      } else {
        getSpotById({
          id: id,
          dispatch,
          token: userInfo.token,
        });
      }
    }, [userInfo.token, appInfo.popmodal, event]);

    if (!location.lat || !location.lng) {
      return null;
    }

    return (
      <Marker
        coordinate={{
          latitude: location.lat,
          longitude: location.lng,
        }}
        onPress={handlePress}
        style={{ ...styles.marker, width: 60, height: 60 }}
        id={id}
      >
        <View style={{ ...styles.wrapper, backgroundColor: accent3 }} />

        <View style={styles.clusterContainer}>
          <View style={{ ...styles.cluster, backgroundColor: accent3 }}>
            {cover?.src ? (
              <Image
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 30,
                  resizeMode: "cover",
                }}
                source={{ uri: cover.src }}
              />
            ) : (
              <Ionicons
                name="location-sharp"
                style={{ fontSize: 20, color: white }}
              />
            )}
          </View>
        </View>
      </Marker>
    );
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: appInfo.selectedCity.lat
          ? appInfo.selectedCity.lat
          : 56.951558605853045,
        longitude: appInfo.selectedCity.lng
          ? appInfo.selectedCity.lng
          : 24.11329820976595,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      customMapStyle={mapStyleDark}
      onMapLoaded={() => setMapLoaded(true)}
      showsCompass={false}
      showsBuildings={false}
      showsUserLocation
      showsMyLocationButton={false}
      showsTraffic={false}
      showsScale={false}
      provider={PROVIDER_GOOGLE}
      rotateEnabled={false}
      spiralEnabled={false}
      animationEnabled={false}
      clusterTextColor={white}
      onPress={hideModal}
      tracksViewChanges={Platform.OS === "ios" ? true : false}
      ref={mapRef}
      onClusterPress={handleClustererPress}
    >
      {appInfo.mapSearchResults?.events &&
        mapLoaded &&
        appInfo.mapSearchResults.events.map((event, i) => {
          if (event.location.lat && event.location.lng) {
            if (event.priority >= 50) {
              return <PriorityMarker {...event} key={i} event />;
            }

            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: event.location.lat,
                  longitude: event.location.lng,
                }}
                style={styles.marker}
                id={event.id}
                tracksViewChanges={Platform.OS === "ios" ? true : false}
                onPress={() => handleEventPress(event.id)}
              >
                <View style={styles.wrapper} />

                <View style={styles.clusterContainer}>
                  <View style={styles.cluster}>
                    <Ionicons
                      name="ios-star"
                      style={{ fontSize: 20, color: white }}
                    />
                  </View>
                </View>
              </Marker>
            );
          }

          return null;
        })}

      {appInfo.mapSearchResults?.spots &&
        mapLoaded &&
        appInfo.mapSearchResults.spots.map((spot, i) => {
          if (spot.location.lat && spot.location.lng) {
            if (spot.priority >= 50) {
              return <PriorityMarker {...spot} key={i} />;
            }

            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: spot.location.lat,
                  longitude: spot.location.lng,
                }}
                onPress={() => handleSpotPress(spot.id)}
                style={styles.marker}
                id={spot.id}
                tracksViewChanges={Platform.OS === "ios" ? true : false}
              >
                <View style={{ ...styles.wrapper, backgroundColor: accent3 }} />

                <View style={styles.clusterContainer}>
                  <View style={{ ...styles.cluster, backgroundColor: accent1 }}>
                    <Ionicons
                      name="location-sharp"
                      style={{ fontSize: 20, color: white }}
                    />
                  </View>
                </View>
              </Marker>
            );
          }

          return null;
        })}

      {appInfo.mapEvents &&
        mapLoaded &&
        !appInfo.mapSearchResults &&
        appInfo.mapEvents.map((event, i) => {
          if (event.location.lat && event.location.lng) {
            if (event.priority >= 50) {
              return <PriorityMarker {...event} key={i} event />;
            }

            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: event.location.lat,
                  longitude: event.location.lng,
                }}
                style={styles.marker}
                id={event.id}
                tracksViewChanges={Platform.OS === "ios" ? true : false}
                onPress={() => handleEventPress(event.id)}
              >
                <View style={styles.wrapper} />

                <View style={styles.clusterContainer}>
                  <View style={styles.cluster}>
                    <Ionicons
                      name="ios-star"
                      style={{ fontSize: 20, color: white }}
                    />
                  </View>
                </View>
              </Marker>
            );
          }

          return null;
        })}

      {appInfo.mapSpots &&
        mapLoaded &&
        !appInfo.mapSearchResults &&
        appInfo.mapSpots.map((spot, i) => {
          if (spot.location.lat && spot.location.lng) {
            if (spot.priority >= 50) {
              return <PriorityMarker {...spot} key={i} />;
            }

            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: spot.location.lat,
                  longitude: spot.location.lng,
                }}
                onPress={() => handleSpotPress(spot.id)}
                style={styles.marker}
                id={spot.id}
                tracksViewChanges={Platform.OS === "ios" ? true : false}
              >
                <View style={{ ...styles.wrapper, backgroundColor: accent3 }} />

                <View style={styles.clusterContainer}>
                  <View style={{ ...styles.cluster, backgroundColor: accent1 }}>
                    <Ionicons
                      name="location-sharp"
                      style={{ fontSize: 20, color: white }}
                    />
                  </View>
                </View>
              </Marker>
            );
          }

          return null;
        })}
    </MapView>
  );
});

export default MapComponent;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    position: "relative",
  },
  wrapper: {
    opacity: 0.5,
    zIndex: 0,
    backgroundColor: "#00B386",
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 50,
  },
  clusterContainer: {
    padding: 5,
    borderRadius: 50,
    width: "100%",
    height: "100%",
  },
  cluster: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#00B386",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
