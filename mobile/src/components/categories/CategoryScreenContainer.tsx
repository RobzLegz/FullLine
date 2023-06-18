import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  setCurrentCategory,
} from "../../redux/slices/appSlice";
import { H3, Strong } from "../../styles/text";
import { accent3, white } from "../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalLoader from "../notification/GlobalLoader";
import { FlashList } from "@shopify/flash-list";
import EventCard from "../event/EventCard";
import { formatCityName } from "../../utils/formatCityName";

const CategoryScreenContainer = memo(() => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { params } = useRoute<any>();

  const appInfo: AppInfo = useSelector(selectApp);

  const handleBackPress = useCallback(() => {
    dispatch(setCurrentCategory(null));
    if (!params) {
      navigation.navigate({
        name: "Home",
      });
      return true;
    }

    const prev: any = params.prev_screen;
    if (!prev) {
      navigation.navigate({
        name: "Home",
      });
      return true;
    }

    navigation.navigate({
      name: prev,
    });

    return true;
  }, [navigation, params]);

  if (!appInfo.currentCategory) {
    return <GlobalLoader />;
  }

  const { events, name } = appInfo.currentCategory;
  const cover = events?.[0]?.cover;

  return (
    <View style={styles.container}>
      <View style={styles.topOptions}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" style={{ fontSize: 28, color: white }} />
        </TouchableOpacity>

        <H3 style={{ color: white, fontSize: 20, marginLeft: 4 }}>{name}</H3>
      </View>

      <ScrollView style={styles.info} showsVerticalScrollIndicator={false}>
        <View style={styles.eventContainer}>
          {appInfo.categoryLocalEvents && appInfo.selectedCity ? (
            <View style={styles.localEventContainer}>
              <Strong
                style={{
                  color: accent3,
                  fontSize: 20,
                  borderBottomWidth: 2,
                  marginBottom: 8,
                  borderBottomColor: accent3,
                  paddingBottom: 4,
                }}
              >
                {formatCityName(appInfo.selectedCity.name)}
              </Strong>

              <FlashList
                data={appInfo.categoryLocalEvents}
                renderItem={({ item }) => <EventCard {...item} />}
                estimatedItemSize={300}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          ) : null}

          {events && events.length > 0 ? (
            <View
              style={{
                ...styles.localEventContainer,
                marginTop: appInfo.categoryLocalEvents ? 8 : 0,
              }}
            >
              {appInfo.categoryLocalEvents && (
                <Strong
                  style={{
                    color: accent3,
                    fontSize: 20,
                    borderBottomWidth: 2,
                    marginTop: 14,
                    marginBottom: 8,
                    borderBottomColor: accent3,
                    paddingBottom: 4,
                  }}
                >
                  Citur
                </Strong>
              )}

              <FlashList
                data={events}
                renderItem={({ item }) => <EventCard {...item} />}
                estimatedItemSize={300}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
});

export default CategoryScreenContainer;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  info: {
    width: "100%",
    height: "100%",
  },
  headerImage: {
    width: "100%",
    height: 150,
  },
  mainInfo: { width: "100%", position: "relative" },
  mainInfoCover: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  topOptions: {
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  eventContainer: {
    padding: 10,
    width: "100%",
    height: "100%",
  },
  localEventContainer: {
    width: "100%",
  },
});
