import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { ExEvent } from "../../interfaces/backendTypes";
import { Small, Strong } from "../../styles/text";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { getEventById } from "../../requests/eventRequests";
import { accent3, darkGray, primary800 } from "../../constants/colors";
import { formatDate } from "../../utils/formatDate";
import Background from "../ui/Background";

const EventCardSmall: React.FC<ExEvent & { categoryId: string }> = ({
  categoryId,
  ...props
}) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute();

  const userInfo: UserInfo = useSelector(selectUser);

  const handleEventPress = useCallback(
    async (id: string) => {
      navigation.navigate("Event", {
        prev_screen: route.name,
      });

      await getEventById({
        id,
        dispatch,
        token: userInfo.token,
      });
    },
    [categoryId, userInfo.token, route]
  );

  return (
    <TouchableOpacity
      style={categoryId === "news" ? styles.feedNews : styles.feedEvent}
      activeOpacity={1}
      onPress={() => handleEventPress(props.id)}
    >
      {props.priority && props.priority >= 60 ? (
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5,
          }}
        >
          <View
            style={{
              backgroundColor: accent3,
              padding: 4,
              borderBottomRightRadius: 8,
            }}
          >
            <Small>Reklāma</Small>
          </View>
        </View>
      ) : null}

      {props.cover ? (
        <Image
          style={
            categoryId === "news"
              ? styles.eventImage
              : { ...styles.eventImage, height: 200, borderRadius: 5 }
          }
          source={{ uri: props.cover?.src }}
        />
      ) : (
        <View
          style={{
            ...styles.eventImage,
            backgroundColor: primary800,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
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

      {categoryId !== "news" && (
        <View style={styles.elementInfo}>
          <View style={styles.date}>
            <Strong style={{ color: accent3, fontSize: 16 }}>
              {!props.start_date
                ? null
                : !props.end_date ||
                  formatDate(props.start_date) === formatDate(props.end_date)
                ? `${formatDate(props.start_date)}`
                : `${formatDate(props.start_date)} - ${formatDate(
                    props.end_date
                  )}`}
            </Strong>
          </View>

          <Strong style={{ color: darkGray, fontSize: 14 }}>
            {props.title}
          </Strong>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default EventCardSmall;

const styles = StyleSheet.create({
  feedNews: {
    width: 250,
    height: 320,
    marginRight: 6,
    borderRadius: 8,
    overflow: "hidden",
  },
  feedEvent: {
    position: "relative",
    width: 220,
    marginRight: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  elementInfo: {
    marginTop: 2,
    width: "100%",
  },
  date: {
    flexDirection: "row",
    alignPropss: "center",
  },
  noCoverLogo: {
    width: 73,
    height: 120,
    resizeMode: "cover",
    zIndex: 5,
  },
});
