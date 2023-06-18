import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  accent3,
  primary400,
  primary700,
  primary800,
  primary900,
} from "../../constants/colors";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { getNearbyData } from "../../requests/nearbySearchRequests";
import { UserInfo, selectUser } from "../../redux/slices/userSlice";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { H1, H3, P, Strong } from "../../styles/text";
import { FlashList } from "@shopify/flash-list";
import { NearbySpot } from "../../interfaces/extendedTypes";
import EventCard from "../event/EventCard";
import SpotCard from "../spot/SpotCard";

const NearbySearchContainer = () => {
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);

  const userInfo: UserInfo = useSelector(selectUser);
  const appInfo: AppInfo = useSelector(selectApp);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handlePress = async () => {
    if (!userInfo.token) {
      return;
    }

    setClicked(true);

    await delay(2000);

    await getData();

    setClicked(false);
  };

  const getData = async () => {
    if (
      !userInfo.token ||
      !appInfo.userCoords ||
      !appInfo.userCoords.lat ||
      !appInfo.userCoords.lng
    ) {
      return;
    }

    await getNearbyData({
      dispatch,
      lat: appInfo.userCoords.lat,
      lng: appInfo.userCoords.lng,
      token: userInfo.token,
    });
  };

  const AnimatedDot: React.FC<{ index: number }> = ({ index }) => {
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.dot,
          useAnimatedStyle(() => {
            if (!clicked) {
              return {};
            }

            return {
              opacity: withDelay(
                index * 250,
                withRepeat(
                  withSequence(
                    withTiming(0.8, { duration: 700 }),
                    withTiming(0, { duration: 700 }),
                    withTiming(0, { duration: 700 })
                  ),
                  -1
                )
              ),
              transform: [
                {
                  scale: withDelay(
                    index * 250,
                    withRepeat(
                      withSequence(
                        withTiming(1, { duration: 700 }),
                        withTiming(3, { duration: 700 }),
                        withTiming(1, { duration: 700 })
                      ),
                      -1
                    )
                  ),
                },
              ],
            };
          }),
        ]}
      />
    );
  };

  const renderSpot = ({ item }: { item: NearbySpot }) => {
    return <SpotCard {...item} />;
  };

  if (appInfo.nearbyData) {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <H1>Tuvumā</H1>
        </View>

        {appInfo.nearbyData.spots && appInfo.nearbyData.spots.length > 0 ? (
          <View style={styles.listContainer}>
            <H3 style={{ fontSize: 20, color: primary400, marginBottom: 8 }}>
              Vietas
            </H3>

            <FlashList
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderSpot}
              data={appInfo.nearbyData.spots}
              style={{ height: "auto" }}
              estimatedItemSize={200}
            />
          </View>
        ) : null}

        {appInfo.nearbyData.events && appInfo.nearbyData.events.length > 0 ? (
          <View style={styles.listContainer}>
            <H3 style={{ fontSize: 20, color: primary400, marginBottom: 8 }}>
              Pasākumi
            </H3>

            <FlashList
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <EventCard {...item} />}
              data={appInfo.nearbyData.events}
              estimatedItemSize={200}
            />
          </View>
        ) : null}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ ...styles.dot, position: "relative" }}>
        {[...Array(4).keys()].map((i) => (
          <AnimatedDot index={i} key={i} />
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          disabled={clicked || !userInfo.token}
          activeOpacity={1}
        >
          <MaterialIcons name="my-location" size={40} color={accent3} />
        </TouchableOpacity>
      </View>

      <Strong
        style={{
          textAlign: "center",
          color: accent3,
          marginTop: 16,
          marginBottom: 4,
          fontSize: 18,
        }}
      >
        Ģeo-meklētājs
      </Strong>
      <P style={{ width: 250, textAlign: "center", color: primary400 }}>
        Atrodi izklaides iespējas tuvumā
      </P>
    </View>
  );
};

export default NearbySearchContainer;

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    backgroundColor: primary900,
    padding: 10,
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary900,
  },
  dot: {
    width: 160,
    height: 160,
    borderRadius: 160,
    backgroundColor: accent3,
  },
  button: {
    width: 160,
    height: 160,
    borderRadius: 160,
    backgroundColor: primary800,
    borderWidth: 3,
    borderColor: primary700,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
    marginBottom: 20,
  },
  header: {
    width: "100%",
    paddingVertical: 10,
    marginBottom: 10,
  },
});
