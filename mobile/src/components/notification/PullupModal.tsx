import { StyleSheet, View } from "react-native";
import React, { useEffect, memo, useRef } from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import {
  NotificationInfo,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import ModalLoading from "../notification/ModalLoading";
import { darkGray, primary700, primary800 } from "../../constants/colors";
import { H3 } from "../../styles/text";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface Props {
  children?: React.ReactNode;
  title?: string;
  snapPoints?: string[];
  scrollEnabled?: boolean;
  paddingHorizontal?: number;
  backgroundColor?: string;
  opened?: number;
}

const PullupModal: React.FC<Props> = memo(
  ({
    children,
    title,
    snapPoints = ["25%", "50%"],
    scrollEnabled = false,
    paddingHorizontal = 10,
    backgroundColor = primary800,
    opened = 0,
  }) => {
    const appInfo: AppInfo = useSelector(selectApp);
    const notificationInfo: NotificationInfo = useSelector(selectNotification);

    const sheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
      if (sheetRef.current) {
        if (opened > 0) {
          sheetRef.current.expand();
        } else {
          sheetRef.current.close();
        }
      }
    }, [opened]);

    return (
      <BottomSheet
        ref={sheetRef}
        style={styles.bottomSheetContainer}
        backgroundStyle={{ backgroundColor: backgroundColor }}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        handleComponent={() => (
          <View style={styles.panner}>
            <View style={styles.pannerLine}></View>
          </View>
        )}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
        >
          {title && (
            <View
              style={{
                width: "100%",
                paddingLeft: 10,
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <H3>{title}</H3>
            </View>
          )}

          {notificationInfo.type === "modal_loading" ? <ModalLoading /> : null}

          <View
            style={{
              paddingHorizontal: paddingHorizontal,
              width: "100%",
              paddingBottom: 150,
            }}
          >
            {children}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

export default PullupModal;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderWidth: 2,
    borderColor: primary700,
    borderRadius: 15,
    zIndex: 10,
    overflow: "hidden",
  },
  top: {
    width: "100%",
  },
  topInfo: {
    width: "100%",
    paddingHorizontal: 15,
  },
  panner: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    left: 0,
  },
  pannerLine: {
    width: 25,
    height: 4,
    backgroundColor: darkGray,
    borderRadius: 5,
  },
});
