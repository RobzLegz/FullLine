import { MMKV } from "react-native-mmkv";
import { Dispatch } from "@reduxjs/toolkit";
import { loadState } from "../redux/slices/appSlice";

export const mmkv = new MMKV();

const loadStateFromMMKV = (dispatch: Dispatch) => {
  const savedState = mmkv.getString("redux-state");
  if (savedState) {
    console.log(JSON.parse(savedState));
    dispatch(loadState(JSON.parse(savedState)));
  }
};

export default loadStateFromMMKV;
