import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  setCurrentSpot,
} from "../../redux/slices/appSlice";
import { P, Strong } from "../../styles/text";
import {
  accent3,
  darkGray,
  primary700,
  primary800,
  primary900,
  white,
} from "../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalLoader from "../notification/GlobalLoader";
import { useImageAspectRatio } from "../../hooks/useImageAspectRatio";
import Hyperlink from "react-native-hyperlink";
import { validEmail } from "../../utils/valid";
import { clickWebsiteUrl } from "../../requests/spotRequests";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { FlashList } from "@shopify/flash-list";
import EventImage from "../event/EventImage";
import FeedSection from "../home/FeedSection";

interface Props {
  headerShown?: boolean;
}

const SpotScreenContainer: React.FC<Props> = memo(({ headerShown = true }) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);

  const aspectRatio = useImageAspectRatio(appInfo.currentSpot?.cover?.src);

  const handleBackPress = useCallback(() => {
    dispatch(setCurrentSpot(null));
    navigation.goBack();
  }, [navigation]);

  const handleLinkPress = useCallback(
    async (link: string) => {
      if (!appInfo.currentSpot) {
        return;
      }

      if (validEmail(link.replace("mailto:", ""))) {
        await Linking.openURL(link);
      }

      clickWebsiteUrl({
        id: appInfo.currentSpot.id,
        token: userInfo.token,
      });

      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      }
    },
    [appInfo.currentSpot]
  );

  const openGoogleMapsNavigation = async () => {
    if (!appInfo.currentSpot) {
      return;
    }

    const url = `http://www.google.com/maps/place/${appInfo.currentSpot.location.lat},${appInfo.currentSpot.location.lng}`;

    await Linking.openURL(url);
  };

  const handleSharePress = useCallback(() => {
    if (!appInfo.currentSpot || !appInfo.currentSpot.spotloc_url) {
      return;
    }

    const options = {
      title: name,
      message: `https://spotloc.lv/spot${appInfo.currentSpot.spotloc_url}`,
      url: `https://spotloc.lv/spot${appInfo.currentSpot.spotloc_url}`,
      subject: name,
    };

    Share.share(options);
  }, [appInfo.currentSpot]);

  if (!appInfo.currentSpot) {
    return <GlobalLoader />;
  }

  const {
    cover,
    name,
    description,
    events,
    website_url,
    location: { lat, lng, address },
    spotloc_url,
    images,
  } = appInfo.currentSpot;

  const spotEventData: any = {
    id: "123",
    name: "Pasākumi",
    events: events,
  };

  return (
    <View style={styles.container}>
      {headerShown && (
        <View style={styles.topOptions}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons
              name="arrow-back"
              style={{ fontSize: 28, color: white }}
            />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.info} showsVerticalScrollIndicator={false}>
        {cover && (
          <View style={styles.coverContainer}>
            <Image
              source={{ uri: cover.src }}
              style={{ ...styles.headerImage, aspectRatio }}
            />
          </View>
        )}

        <View style={styles.mainInfo}>
          <Strong style={{ color: white, fontSize: 20, flex: 1 }}>
            {name}
          </Strong>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <View>
              {address ? (
                <P style={{ marginTop: 5, fontSize: 16, color: darkGray }}>
                  {address}
                </P>
              ) : null}

              {lat && lng ? (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    width: 100,
                    marginTop: 5,
                  }}
                  onPress={openGoogleMapsNavigation}
                >
                  <MaterialCommunityIcons
                    name="map-marker-radius-outline"
                    style={{ fontSize: 20, color: accent3, marginRight: 2 }}
                  />
                  <P style={{ color: accent3, fontSize: 14 }}>Norādes</P>
                </TouchableOpacity>
              ) : null}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {spotloc_url && (
                <TouchableOpacity
                  onPress={handleSharePress}
                  style={{ marginRight: 4 }}
                >
                  <Ionicons
                    name="ios-share-outline"
                    style={{ fontSize: 30, color: accent3 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <Hyperlink
          linkStyle={{ color: accent3 }}
          onPress={(url) => handleLinkPress(url)}
        >
          <View style={styles.about}>
            <P
              style={{
                color: darkGray,
                marginBottom: 15,
              }}
            >
              {description}
            </P>
          </View>
        </Hyperlink>

        {events && events.length > 0 ? (
          <View style={{ paddingHorizontal: 10 }}>
            <FeedSection {...spotEventData} spot />
          </View>
        ) : null}

        {(!events || events.length === 0) && images && images.length > 1 ? (
          <View style={styles.imageContainer}>
            <FlashList
              renderItem={({ item }: { item: any }) => (
                <EventImage src={item.src} alt={item.alt} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={150}
              data={images}
            />
          </View>
        ) : null}

        {website_url ? (
          <View style={styles.links}>
            <Strong style={styles.sectionName}>Mājaslapa:</Strong>

            <TouchableOpacity onPress={() => handleLinkPress(website_url)}>
              <P style={{ color: accent3 }}>{website_url}</P>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
});

export default SpotScreenContainer;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%", backgroundColor: primary900 },
  info: {
    width: "100%",
    height: "100%",
  },
  coverContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerImage: {
    width: "100%",
    borderRadius: 20,
  },
  mainInfo: { width: "100%", padding: 10, paddingBottom: 0 },
  topOptions: {
    width: "100%",
    padding: 10,
    height: 50,
    backgroundColor: primary900,
    flexDirection: "row",
  },
  about: {
    width: "100%",
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 20,
  },
  links: {
    width: "100%",
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  bottomPadding: { width: "100%", height: 30 },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: accent3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    maxWidth: 300,
    marginBottom: 15,
  },
  partnerInfoContainer: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  partnerInfo: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 4,
    backgroundColor: primary800,
    borderColor: primary700,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  },
  partnerInfoImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: "cover",
    marginRight: 10,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionName: {
    fontSize: 18,
    marginBottom: 4,
  },
});
