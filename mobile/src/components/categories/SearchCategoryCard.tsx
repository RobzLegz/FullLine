import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { ExCategory } from "../../interfaces/backendTypes";
import { Strong } from "../../styles/text";
import { white } from "../../constants/colors";
import { getCategoryById } from "../../requests/categoryRequests";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, UserInfo } from "../../redux/slices/userSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setCurrentCategory } from "../../redux/slices/appSlice";

const SearchCategoryCard: React.FC<ExCategory> = ({ id, name, events }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute();

  const userInfo: UserInfo = useSelector(selectUser);

  const handleCategoryClick = useCallback(async () => {
    navigation.navigate("Category", {
      prev_screen: route.name,
    });

    dispatch(setCurrentCategory(null));

    await getCategoryById({ id, dispatch, token: userInfo.token });
  }, [id, userInfo.token, route]);

  if (!events || !events.length || !events[0].cover) {
    return null;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.container }}
      activeOpacity={1}
      onPress={handleCategoryClick}
    >
      <Image style={styles.cover} source={{ uri: events[0].cover.src }} />
      <View style={styles.overlay}>
        <Strong style={{ color: white, fontSize: 18 }}>{name}</Strong>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCategoryCard;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    margin: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
  cover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
  },
});
