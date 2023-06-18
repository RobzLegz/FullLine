import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  setCurrentEvent,
} from "../../redux/slices/appSlice";
import { H3, P, Strong } from "../../styles/text";
import {
  accent3,
  darkGray,
  primary700,
  primary800,
  primary900,
  white,
} from "../../constants/colors";
import { formatDate } from "../../utils/formatDate";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
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
import {
  clickWebsiteUrl,
  saveEvent,
  unsaveEvent,
} from "../../requests/eventRequests";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { FlashList } from "@shopify/flash-list";
import EventImage from "./EventImage";

interface Props {
  headerShown?: boolean;
}

const EventScreenContainer: React.FC<Props> = memo(({ headerShown = true }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);
  const userInfo: UserInfo = useSelector(selectUser);

  const [saved, setSaved] = useState(
    userInfo?.info?.saved_event_ids?.some(
      (eId) => eId === appInfo.currentEvent?.id
    )
      ? true
      : false
  );
  const [limiter, setLimiter] = useState<NodeJS.Timeout | null>(null);
  const [prevSaved, setPrevSaved] = useState(
    userInfo?.info?.saved_event_ids?.some(
      (eId) => eId === appInfo.currentEvent?.id
    )
      ? true
      : false
  );

  useEffect(() => {
    if (userInfo.info?.saved_event_ids && appInfo.currentEvent) {
      setPrevSaved(
        userInfo.info?.saved_event_ids?.some(
          (eId) => eId === appInfo.currentEvent?.id
        )
          ? true
          : false
      );
      setSaved(
        userInfo.info?.saved_event_ids?.some(
          (eId) => eId === appInfo.currentEvent?.id
        )
          ? true
          : false
      );
    }
  }, [userInfo.info?.saved_event_ids, appInfo.currentEvent]);

  const aspectRatio = useImageAspectRatio(appInfo.currentEvent?.cover?.src);

  const handleBackPress = useCallback(() => {
    dispatch(setCurrentEvent(null));
    navigation.goBack();
  }, [navigation]);

  const handleLinkPress = useCallback(
    async (link: string) => {
      if (!appInfo.currentEvent) {
        return;
      }

      if (validEmail(link.replace("mailto:", ""))) {
        await Linking.openURL(link);
      }

      clickWebsiteUrl({
        id: appInfo.currentEvent.id,
        token: userInfo.token,
      });

      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      }
    },
    [appInfo.currentEvent]
  );

  const handleSavePress = async () => {
    if (!appInfo.currentEvent) {
      return;
    }

    const newSaved = !saved;
    setSaved(newSaved);

    const sendReq = async () => {
      if (newSaved === prevSaved || !appInfo.currentEvent) {
        return;
      }

      setPrevSaved(newSaved);

      if (newSaved === true) {
        await saveEvent({
          id: appInfo.currentEvent.id,
          dispatch,
          token: userInfo.token,
        });
      } else {
        await unsaveEvent({
          id: appInfo.currentEvent.id,
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

  const openGoogleMapsNavigation = async () => {
    if (!appInfo.currentEvent) {
      return;
    }

    const url = `http://www.google.com/maps/place/${appInfo.currentEvent.location.lat},${appInfo.currentEvent.location.lng}`;

    await Linking.openURL(url);
  };

  const handleSharePress = useCallback(() => {
    if (!appInfo.currentEvent || !appInfo.currentEvent.event_url) {
      return;
    }

    const options = {
      title: title,
      message: appInfo.currentEvent.event_url,
      url: appInfo.currentEvent.event_url,
      subject: title,
    };

    Share.share(options);
  }, [appInfo.currentEvent]);

  if (!appInfo.currentEvent) {
    return <GlobalLoader />;
  }

  const {
    cover,
    title,
    start_date,
    start_time,
    end_date,
    end_time,
    info,
    website_urls,
    images,
    location: { lat, lng, location, address },
    ticket_url,
    event_url,
  } = appInfo.currentEvent;

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
            {title}
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
              {start_date && end_date && end_date !== start_date ? (
                <H3 style={{ color: accent3, fontSize: 24 }}>
                  {formatDate(start_date)} - {formatDate(end_date)}
                </H3>
              ) : (
                start_date && (
                  <H3 style={{ color: accent3, fontSize: 24 }}>
                    {formatDate(start_date)}
                  </H3>
                )
              )}

              {start_time && end_time && start_time !== end_time ? (
                <P style={{ fontSize: 18 }}>
                  {start_time} - {end_time}
                </P>
              ) : start_time ? (
                <P style={{ fontSize: 18 }}>{start_time}</P>
              ) : null}

              {location ? (
                <P style={{ marginTop: 5, fontSize: 16, color: darkGray }}>
                  {location}
                </P>
              ) : address ? (
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
              {event_url && (
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

              {userInfo.token && userInfo.info && (
                <TouchableOpacity onPress={handleSavePress}>
                  <Ionicons
                    name={saved ? "bookmark" : "bookmark-outline"}
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
            {info.map((txt, i) => (
              <P
                key={i}
                style={{
                  color: darkGray,
                  marginBottom: 15,
                }}
              >
                {txt}
              </P>
            ))}
          </View>
        </Hyperlink>

        {ticket_url && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLinkPress(ticket_url)}
            >
              <Strong style={{ color: white }}>Pirkt biļeti</Strong>
            </TouchableOpacity>
          </View>
        )}

        {images && images.length > 1 ? (
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

        {website_urls &&
        website_urls.filter((url) => url.replace(" ", "").length > 0).length >
          0 ? (
          <View style={styles.links}>
            <Strong style={styles.sectionName}>Saites:</Strong>

            {website_urls
              .filter((url) => url)
              .map((site, i) => (
                <TouchableOpacity
                  key={i}
                  style={{ marginBottom: 10 }}
                  onPress={() => handleLinkPress(site)}
                >
                  <P style={{ color: accent3 }}>{site}</P>
                </TouchableOpacity>
              ))}
          </View>
        ) : null}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
});

export default EventScreenContainer;

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
