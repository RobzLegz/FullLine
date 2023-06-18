import React, { memo } from "react";
import { H3, Strong } from "../../styles/text";
import { formatDate } from "../../utils/formatDate";
import {
  primary700,
  accent3,
  primary400,
  primary900,
  white,
} from "../../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getEventById } from "../../requests/eventRequests";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { NearbyEvent } from "../../interfaces/extendedTypes";

const ModalEventCard: React.FC<NearbyEvent> = memo(
  ({ title, start_date, end_date, id, cover, priority }) => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const route = useRoute();

    const userInfo: UserInfo = useSelector(selectUser);

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

    return (
      <TouchableOpacity
        style={{
          ...styles.container,
          borderColor: priority >= 60 ? accent3 : styles.container.borderColor,
        }}
        onPress={handleEventPress}
        activeOpacity={1}
      >
        <View style={styles.content}>
          {cover ? (
            <Image style={styles.cover} source={{ uri: cover.src }} />
          ) : (
            <View style={styles.noCover}>
              <Image
                style={styles.noCoverLogo}
                source={require("../../../assets/spotloc-icon.png")}
              />
            </View>
          )}

          <View style={styles.info}>
            <H3 style={{ color: primary400, fontSize: 16 }}>{title}</H3>

            <View style={styles.dateContainer}>
              <View style={styles.date}>
                <H3 style={{ color: accent3, fontSize: 14 }}>
                  {!start_date
                    ? null
                    : !end_date ||
                      formatDate(start_date) === formatDate(end_date)
                    ? `${formatDate(start_date)}`
                    : `${formatDate(start_date)} - ${formatDate(end_date)}`}
                </H3>
              </View>
            </View>
          </View>
        </View>

        {priority >= 60 ? (
          <View style={styles.adContainer}>
            <View style={styles.adCorner}>
              <Strong style={{ color: white, fontSize: 16 }}>Reklāma</Strong>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }
);

export default ModalEventCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: primary900,
    borderWidth: 2,
    borderColor: primary700,
  },
  content: {
    flexDirection: "row",
    padding: 4,
  },
  cover: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  noCover: {
    width: 65,
    height: 65,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  noCoverLogo: {
    width: 24.5,
    height: 40,
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
  info: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 5,
  },
  adContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  adCorner: {
    padding: 5,
    borderTopLeftRadius: 8,
    backgroundColor: accent3,
    alignItems: "center",
    justifyContent: "center",
  },
});
