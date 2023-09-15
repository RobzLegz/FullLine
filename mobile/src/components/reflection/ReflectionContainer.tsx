import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { accent, gray, white } from "../../styles/colors";
import { H3, P } from "../../styles/text";
import { FlashList } from "@shopify/flash-list";

const ReflectionContainer: React.FC<{ close: () => void }> = ({ close }) => {
  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.reflection) {
    return (
      <View style={styles.container}>
        <View style={[styles.content, { padding: 10 }]}>
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../../assets/images/welcome.png")}
              style={styles.image}
            />

            <H3 style={{ fontSize: 20, color: accent }}>
              Achieving Perfect Harmony for a Fulfilled Life
            </H3>

            <P style={{ fontSize: 18, marginTop: 4, lineHeight: 25 }}>
              In this moment of reflection, your life is a balanced landscape of
              perfect equilibrium. Confidence, Goals, Purpose, Harmony,
              Happiness, and Awareness are all in balance, creating the
              foundation for a truly fulfilled life.
            </P>
          </View>

          <View style={{ width: "100%", alignItems: "center", padding: 10 }}>
            <TouchableOpacity style={styles.button} onPress={close}>
              <P style={{ color: white, fontSize: 16 }}>Okay</P>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          style={{ flex: 1, padding: 10, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../../../assets/images/imbalance.png")}
            style={styles.image}
          />

          <H3 style={{ fontSize: 20, color: accent }}>
            Seeking Balance from the Depths
          </H3>

          <P
            style={{
              fontSize: 18,
              marginTop: 4,
              marginBottom: 10,
              lineHeight: 25,
            }}
          >
            In this moment of reflection, it's clear that balance eludes you.
            Like an unbalanced scale, some areas overshadow others. It's time to
            recalibrate for a more harmonious journey to fulfillment.
          </P>

          <FlashList
            data={appInfo.reflection}
            renderItem={({ item }) => <CategoryCard {...item} />}
            scrollEnabled={false}
            estimatedItemSize={120}
          />

          <View style={{ height: 100 }} />
        </ScrollView>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            padding: 10,
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={close}>
            <P style={{ color: white, fontSize: 16 }}>Okay</P>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReflectionContainer;

const CategoryCard: React.FC<{
  text: string;
  icon: any;
  score: number;
}> = ({ text, icon, score }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={icon}
        style={{
          width: 50,
          height: 50,
          tintColor: !score ? "gray" : undefined,
          opacity: !score ? 0.3 : undefined,
        }}
      />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <P>{text}</P>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 40,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 15,
    width: "100%",
    height: "100%",
  },
  content: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: white,
    borderWidth: 2,
    borderColor: gray,
  },
  image: {
    height: 260,
    width: "100%",
    resizeMode: "contain",
  },
  button: {
    width: "100%",
    maxWidth: 200,
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: accent,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
