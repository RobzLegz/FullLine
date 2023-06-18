import React, { memo, useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ExCategory } from "../../interfaces/backendTypes";
import { P } from "../../styles/text";
import {
  AppInfo,
  selectApp,
  selectCategory,
} from "../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { darkGray, gray, primary700, white } from "../../constants/colors";

const PopupCategory: React.FC<ExCategory> = ({ ...props }) => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const [selected, setSelected] = useState(
    appInfo.selectedCategories.some((c) => c.id === props.id)
  );

  const handleCategoryPress = useCallback(() => {
    dispatch(selectCategory(props));
    setSelected(!selected);
  }, [selected]);

  return (
    <TouchableOpacity
      style={{
        ...styles.popupCategory,
        backgroundColor: selected ? props.color : primary700,
      }}
      onPress={handleCategoryPress}
    >
      <P
        style={{
          color: selected ? white : darkGray,
        }}
      >
        {props.name}
      </P>
    </TouchableOpacity>
  );
};

export default PopupCategory;

const styles = StyleSheet.create({
  popupCategory: {
    margin: 5,
    padding: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
