import { createSlice } from "@reduxjs/toolkit";
import { RdxAction } from "./../../types/reduxAction";

export interface NotificationInfo {
  type:
    | null
    | "success"
    | "error"
    | "popup"
    | "loading"
    | "category_popup"
    | "modal_loading"
    | "datepicker_popup"
    | "search_city_popup"
    | "city_popup"
    | "country_popup"
    | "local_loading";
  message: null | string;
  fun?: (x?: any) => void;
  params: null | any;
  toast: {
    type: "success" | "error" | "popup";
    title: string;
    message: string;
    fun?: (x?: any) => Promise<void> | void;
  } | null;
}

type NotificationPayload = RdxAction<{
  type: NotificationInfo["type"];
  message?: string | null;
  fun?: NotificationInfo["fun"];
  params?: any;
}>;

const initialState: NotificationInfo = {
  type: null,
  message: null,
  fun: undefined,
  params: null,
  toast: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: NotificationPayload) => {
      const { type, message, fun, params } = action.payload;

      return {
        ...state,
        type,
        message: message ? message : null,
        fun: fun,
        params: params ? params : null,
      };
    },
    setToastNotification: (state, action) => {
      const { title, message, fun, type } = action.payload;

      return {
        ...state,
        toast: { title, message, fun, type },
      };
    },
    clearNotification: (state) => {
      return {
        ...state,
        type: null,
        message: null,
        fun: undefined,
        params: null,
      };
    },
    clearToastNotification: (state) => {
      return {
        ...state,
        toast: null,
      };
    },
  },
});

export const {
  setNotification,
  clearNotification,
  setToastNotification,
  clearToastNotification,
} = notificationSlice.actions;

export const selectNotification = (state: any) => state.notification;

export default notificationSlice.reducer;
