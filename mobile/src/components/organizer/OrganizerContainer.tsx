import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  setCurrentOrganizer,
} from "../../redux/slices/appSlice";
import { H3, P, Strong } from "../../styles/text";
import { black, darkGray, white } from "../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalLoader from "../notification/GlobalLoader";
import { FlashList } from "@shopify/flash-list";
import EventCard from "../event/EventCard";
import { formatCityName } from "../../utils/formatCityName";

const OrganizerScreenContainer = memo(() => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const handleBackPress = useCallback(() => {
    dispatch(setCurrentOrganizer(null));
    navigation.goBack();
  }, [navigation]);

  return null;

  // if (!appInfo.currentOrganizer) {
  //   return <GlobalLoader />;
  // }

  // const { events, name } = appInfo.currentOrganizer;
  // const cover = events?.[0]?.cover;

  // return (
  //   <View style={styles.container}>
  //     <ScrollView style={styles.info} showsVerticalScrollIndicator={false}>
  //       <View style={styles.mainInfo}>
  //         <View style={styles.topOptions}>
  //           <TouchableOpacity onPress={handleBackPress}>
  //             <Ionicons
  //               name="arrow-back"
  //               style={{ fontSize: 28, color: white }}
  //             />
  //           </TouchableOpacity>
  //         </View>

  //         {cover ? (
  //           <Image
  //             source={{ uri: cover.src }}
  //             style={{ ...styles.headerImage }}
  //           />
  //         ) : null}

  //         {cover ? (
  //           <View style={styles.mainInfoCover}>
  //             <H3 style={{ color: white, fontSize: 24 }}>{name}</H3>
  //           </View>
  //         ) : (
  //           <H3 style={{ color: white, fontSize: 20 }}>{name}</H3>
  //         )}
  //       </View>

  //       <View style={styles.eventContainer}>
  //         {appInfo.categoryLocalEvents && appInfo.selectedCity ? (
  //           <View style={styles.localEventContainer}>
  //             <Strong
  //               style={{
  //                 color: white,
  //                 fontSize: 20,
  //                 borderBottomWidth: 1,
  //                 marginBottom: 8,
  //                 borderBottomColor: darkGray,
  //                 paddingBottom: 4,
  //               }}
  //             >
  //               {formatCityName(appInfo.selectedCity.name)}
  //             </Strong>

  //             <FlashList
  //               data={appInfo.categoryLocalEvents}
  //               renderItem={({ item }) => <EventCard {...item} />}
  //               estimatedItemSize={300}
  //               showsVerticalScrollIndicator={false}
  //               scrollEnabled={false}
  //             />
  //           </View>
  //         ) : null}

  //         <View
  //           style={{
  //             ...styles.localEventContainer,
  //             marginTop: appInfo.categoryLocalEvents ? 8 : 0,
  //           }}
  //         >
  //           {appInfo.categoryLocalEvents && (
  //             <Strong
  //               style={{
  //                 color: white,
  //                 fontSize: 20,
  //                 borderBottomWidth: 1,
  //                 marginBottom: 8,
  //                 borderBottomColor: darkGray,
  //                 paddingBottom: 4,
  //               }}
  //             >
  //               Citur Latvijā
  //             </Strong>
  //           )}

  //           <FlashList
  //             data={events}
  //             renderItem={({ item }) => <EventCard {...item} />}
  //             estimatedItemSize={300}
  //             showsVerticalScrollIndicator={false}
  //             scrollEnabled={false}
  //           />
  //         </View>
  //       </View>
  //     </ScrollView>
  //   </View>
  // );
});

export default OrganizerScreenContainer;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%", backgroundColor: white },
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
    padding: 10,
    height: 50,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
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
