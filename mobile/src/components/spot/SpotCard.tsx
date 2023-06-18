import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import {
  accent3,
  primary400,
  primary700,
  primary800,
} from "../../constants/colors";
import { P, Strong } from "../../styles/text";
import { NearbySpot } from "../../interfaces/extendedTypes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getSpotById } from "../../requests/spotRequests";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo, selectUser } from "../../redux/slices/userSlice";

const SpotCard: React.FC<NearbySpot> = ({ ...props }) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute();

  const userInfo: UserInfo = useSelector(selectUser);

  const handleSpotPress = useCallback(async () => {
    navigation.navigate("Spot", {
      prev_screen: route.name,
    });

    await getSpotById({
      id: props.id,
      dispatch,
      token: userInfo.token,
    });
  }, [props.id, userInfo.token, navigation, route]);

  return (
    <TouchableOpacity
      style={styles.feedSpot}
      activeOpacity={1}
      onPress={() => handleSpotPress()}
    >
      {props.cover ? (
        <Image style={styles.eventImage} source={{ uri: props.cover?.src }} />
      ) : (
        <View
          style={{
            ...styles.eventImage,
            backgroundColor: primary800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.noCoverLogo}
            source={require("../../../assets/spotloc-icon.png")}
          />
        </View>
      )}

      <View style={styles.elementInfo}>
        <Strong style={{ color: primary400, fontSize: 16, flex: 1 }}>
          {props.name.length > 19
            ? `${props.name.substring(0, 19)}...`
            : props.name}
        </Strong>

        {props.distance && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <MaterialCommunityIcons
              name="map-marker-distance"
              style={{ fontSize: 16, color: accent3, marginRight: 2 }}
            />

            <P style={{ color: accent3 }}>{props.distance} km</P>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SpotCard;

const styles = StyleSheet.create({
  feedSpot: {
    width: 250,
    marginRight: 5,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: primary800,
    borderWidth: 2,
    borderColor: primary700,
  },
  eventImage: {
    width: "100%",
    resizeMode: "cover",
    height: 150,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  elementInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  noCoverLogo: {
    width: 73,
    height: 120,
    resizeMode: "cover",
  },
});
