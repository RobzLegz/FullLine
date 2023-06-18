import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  TextInputProps,
} from "react-native";
import React from "react";
import {
  darkGray,
  primary700,
  primary800,
  white,
} from "../../constants/colors";

interface Props extends TextInputProps {
  containerStyle?: object;
  showClose?: boolean;
  style?: object;
  closeFunction?: () => void;
}

const Search: React.FC<Props> = ({
  containerStyle = {},
  showClose,
  closeFunction,
  style = {},
  ...props
}) => {
  return (
    <View style={{ ...styles.search, ...containerStyle }}>
      <MaterialCommunityIcon name="magnify" style={styles.icon} />

      <TextInput style={{ ...styles.input, ...style }} {...props} />

      {showClose && (
        <TouchableOpacity style={styles.filters} onPress={closeFunction}>
          <Ionicons
            name="close"
            style={{
              fontSize: 20,
              color: white,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    backgroundColor: primary800,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 5,
    height: 50,
    borderWidth: 2,
    borderColor: primary700,
  },
  icon: {
    fontSize: 30,
    color: white,
  },
  input: {
    flex: 1,
    height: "100%",
    marginHorizontal: 5,
    fontSize: 16,
    color: white,
  },
  filters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 30,
    height: "100%",
  },
});
