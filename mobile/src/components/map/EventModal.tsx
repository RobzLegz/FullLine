import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import {
  NotificationInfo,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import ModalLoading from "../notification/ModalLoading";
import PullupModal from "../notification/PullupModal";
import EventScreenContainer from "../event/EventScreenContainer";
import SpotScreenContainer from "../spot/SpotScreenContainer";
import { FlashList } from "@shopify/flash-list";
import ModalEventCard from "../event/ModalEventCard";
import { primary900 } from "../../constants/colors";

const EventModal: React.FC = memo(() => {
  const appInfo: AppInfo = useSelector(selectApp);
  const notificationInfo: NotificationInfo = useSelector(selectNotification);

  return (
    <PullupModal
      scrollEnabled
      snapPoints={["75%"]}
      paddingHorizontal={
        appInfo.modalEvents && appInfo.modalEvents.length > 0 ? 5 : 0
      }
      backgroundColor={primary900}
      opened={appInfo.popmodal}
    >
      {notificationInfo.type === "modal_loading" ? <ModalLoading /> : null}

      {appInfo.modalEvents ? (
        <View style={styles.modalEventsCnt}>
          <FlashList
            scrollEnabled={false}
            data={appInfo.modalEvents}
            renderItem={({ item }) => <ModalEventCard {...item} />}
            estimatedItemSize={60}
          />
        </View>
      ) : appInfo.currentEvent ? (
        <EventScreenContainer headerShown={false} />
      ) : appInfo.currentSpot ? (
        <SpotScreenContainer headerShown={false} />
      ) : null}
    </PullupModal>
  );
});

export default EventModal;

const styles = StyleSheet.create({
  modalEventsCnt: { width: "100%", height: "100%", paddingTop: 20 },
});
