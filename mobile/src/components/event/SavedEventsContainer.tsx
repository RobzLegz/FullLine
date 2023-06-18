import React, { memo } from "react";
import { useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { H3 } from "../../styles/text";
import { white } from "../../constants/colors";
import { ScrollView, StyleSheet, View } from "react-native";
import GlobalLoader from "../notification/GlobalLoader";
import { FlashList } from "@shopify/flash-list";
import EventCard from "../event/EventCard";
import TooManyFilters from "../notification/TooManyFilters";

const SavedEventScreenContainer = memo(() => {
  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.savedEvents) {
    return <GlobalLoader />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.info} showsVerticalScrollIndicator={false}>
        <View style={styles.mainInfo}>
          <H3 style={{ marginVertical: 15 }}>Mani pasākumi</H3>
        </View>

        <View style={styles.eventContainer}>
          {appInfo.savedEvents && appInfo.savedEvents.length > 0 ? (
            <FlashList
              data={appInfo.savedEvents}
              renderItem={({ item }) => <EventCard {...item} />}
              estimatedItemSize={300}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : appInfo.savedEvents ? (
            <TooManyFilters msg="Neesat vēl saglabājis nevienu pasākumu" />
          ) : (
            <GlobalLoader />
          )}
        </View>
      </ScrollView>
    </View>
  );
});

export default SavedEventScreenContainer;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  info: {
    width: "100%",
    height: "100%",
    padding: 10,
    position: "relative",
  },
  mainInfo: { width: "100%", position: "relative" },
  eventContainer: {
    width: "100%",
    height: "100%",
    minHeight: 300,
    paddingBottom: 20,
    position: "relative",
  },
});
