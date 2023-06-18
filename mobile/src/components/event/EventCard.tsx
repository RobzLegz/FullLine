import React, { memo, useEffect, useState } from "react";
import { H3, P } from "../../styles/text";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/formatDate";
import {
  primary700,
  accent3,
  darkGray,
  primary400,
  primary800,
} from "../../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getEventById,
  saveEvent,
  unsaveEvent,
} from "../../requests/eventRequests";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { NearbyEvent } from "../../interfaces/extendedTypes";
import Background from "../ui/Background";

const EventCard: React.FC<NearbyEvent> = memo(
  ({
    title,
    start_date,
    end_date,
    id,
    location,
    cover,
    categories,
    distance,
  }) => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const route = useRoute();

    const userInfo: UserInfo = useSelector(selectUser);

    const [saved, setSaved] = useState(
      userInfo.info?.saved_event_ids?.some((eId) => eId === id) ? true : false
    );
    const [limiter, setLimiter] = useState<NodeJS.Timeout | null>(null);
    const [prevSaved, setPrevSaved] = useState(
      userInfo.info?.saved_event_ids?.some((eId) => eId === id) ? true : false
    );

    useEffect(() => {
      if (userInfo.info?.saved_event_ids) {
        setPrevSaved(
          userInfo.info?.saved_event_ids?.some((eId) => eId === id)
            ? true
            : false
        );
        setSaved(
          userInfo.info?.saved_event_ids?.some((eId) => eId === id)
            ? true
            : false
        );
      }
    }, [userInfo.info?.saved_event_ids]);

    const handleEventPress = async () => {
      navigation.navigate("Event", {
        prev_screen: route.name,
      });

      await getEventById({
        id,
        dispatch,
        token: userInfo.token,
      });
    };

    const handleSavePress = async () => {
      const newSaved = !saved;
      setSaved(newSaved);

      const sendReq = async () => {
        if (newSaved === prevSaved) {
          return;
        }

        setPrevSaved(newSaved);

        if (newSaved === true) {
          await saveEvent({
            id,
            dispatch,
            token: userInfo.token,
          });
        } else {
          await unsaveEvent({
            id,
            dispatch,
            token: userInfo.token,
          });
        }
      };

      if (limiter) {
        clearTimeout(limiter);
        setLimiter(null);
      }

      const timeout = setTimeout(sendReq, 900);
      setLimiter(timeout);
    };

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={handleEventPress}
        activeOpacity={1}
      >
        {cover ? (
          <Image style={styles.cover} source={{ uri: cover.src }} />
        ) : (
          <View style={styles.noCover}>
            <Background
              style={{ position: "absolute", top: 0, left: 0 }}
              width="100%"
              height="100%"
            />

            <Image
              style={styles.noCoverLogo}
              source={require("../../../assets/spotloc-icon.png")}
            />
          </View>
        )}

        <View style={styles.info}>
          <View style={styles.dateContainer}>
            <View style={styles.date}>
              <H3 style={{ color: accent3, fontSize: 24 }}>
                {!start_date
                  ? null
                  : !end_date || formatDate(start_date) === formatDate(end_date)
                  ? `${formatDate(start_date)}`
                  : `${formatDate(start_date)} - ${formatDate(end_date)}`}
              </H3>
            </View>
            {userInfo.token && userInfo.info && (
              <TouchableOpacity onPress={handleSavePress}>
                <Ionicons
                  name={saved ? "bookmark" : "bookmark-outline"}
                  style={{ fontSize: 28, color: accent3 }}
                />
              </TouchableOpacity>
            )}
          </View>

          <H3 style={{ color: primary400, fontSize: 18, flex: 1 }}>{title}</H3>

          <View style={styles.bottom}>
            {(location.location || location.address) && (
              <View style={{ ...styles.bottomSection, marginRight: 6 }}>
                <Ionicons
                  name="ios-locate"
                  style={{ fontSize: 16, color: darkGray }}
                />

                <P style={{ color: darkGray, fontSize: 14 }}>
                  {location.location
                    ? location.location.substring(0, 20)
                    : location.address?.substring(0, 20)}
                  ...
                </P>
              </View>
            )}

            {categories && categories.length > 0 ? (
              <View style={styles.bottomSection}>
                <Ionicons
                  name="filter-outline"
                  style={{ fontSize: 16, color: darkGray, marginRight: 1 }}
                />

                {categories?.map((category, i) => (
                  <P
                    style={{ color: darkGray, fontSize: 14, marginRight: -1 }}
                    key={i}
                  >
                    {category.name}
                    {i < categories.length - 1 ? " • " : ""}
                  </P>
                ))}
              </View>
            ) : null}
          </View>

          {distance && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <MaterialCommunityIcons
                name="map-marker-distance"
                style={{ fontSize: 16, color: accent3, marginRight: 4 }}
              />

              <P style={{ color: accent3 }}>{distance} km</P>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

export default EventCard;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: primary800,
    borderWidth: 2,
    borderColor: primary700,
  },
  info: {
    padding: 10,
  },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  noCover: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  noCoverLogo: {
    width: 73,
    height: 120,
    zIndex: 5,
    resizeMode: "cover",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottom: {
    width: "100%",
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    marginBottom: 4,
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
