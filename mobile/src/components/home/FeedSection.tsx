import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { ExCategory, ExEvent } from "../../interfaces/backendTypes";
import { H3, P } from "../../styles/text";
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { accent3 } from "../../constants/colors";
import { getCategoryById } from "../../requests/categoryRequests";
import { primary400 } from "../../constants/colors";
import EventCardSmall from "../event/EventCardSmall";

const FeedSection: React.FC<ExCategory & { spot?: boolean }> = ({
  id: category_id,
  spot = false,
  name,
  events,
}) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute();

  const userInfo: UserInfo = useSelector(selectUser);

  const handleCategoryClick = useCallback(async () => {
    navigation.navigate("Category", {
      prev_screen: route.name,
    });

    await getCategoryById({ dispatch, token: userInfo.token, id: category_id });
  }, [userInfo.token, category_id, route]);

  const renderFeedElement = ({ item }: { item: ExEvent }) => {
    return <EventCardSmall {...item} categoryId={category_id} />;
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <H3 style={{ fontSize: 20, color: primary400, marginLeft: 5 }}>{name}</H3>

        {!spot &&
        category_id !== "news" &&
        category_id !== "recommendations" ? (
          <TouchableOpacity
            onPress={handleCategoryClick}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <P style={{ color: accent3 }}>Rādīt vairāk</P>

            <Ionicons
              name="chevron-forward-outline"
              style={{ fontSize: 16, color: accent3 }}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderFeedElement}
        data={events}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default FeedSection;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 25,
  },
});
