import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { white } from "../../constants/colors";
import { P } from "../../styles/text";
import { Category } from "../../data/categories";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setCurrentCategory } from "../../redux/slices/appSlice";

const CategoryIcon: React.FC<Category> = ({ ...props }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handlePress = () => {
    dispatch(setCurrentCategory(props));
    navigation.navigate("Category");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Icon {...props} />
      </TouchableOpacity>

      <P style={{ marginTop: 6, fontSize: 12 }}>{props.title}</P>
    </View>
  );
};

export const Icon: React.FC<Category> = ({ ...props }) => {
  return (
    <View style={styles.category}>
      <View style={styles.body}>
        <Image source={props.icon} style={styles.icon} />
      </View>

      <View style={styles.fillColor}>
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: props.color,
              height: props.height * 0.8,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CategoryIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  category: {
    width: 80,
    height: 80,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  body: {
    width: "100%",
    height: "100%",
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  fillColor: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
  },
});
