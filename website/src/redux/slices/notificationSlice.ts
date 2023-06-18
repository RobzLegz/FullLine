import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "../../types/reduxPayload";

export interface NotificationInfo {
  type:
    | null
    | "success"
    | "error"
    | "popup"
    | "loading"
    | "category_popup"
    | "form_error"
    | "spot_product"
    | "edit_profile"
    | "datepicker_popup";
  message: null | string;
  fun?: (x?: any) => void;
  params: null | any;
}

type NotificationPayload = Payload<{
  type: NotificationInfo["type"];
  message?: string;
  fun?: NotificationInfo["fun"];
  params?: any;
}>;

const initialState: NotificationInfo = {
  type: null,
  message: null,
  fun: undefined,
  params: null,
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
    clearNotification: (state) => {
      return {
        ...state,
        type: null,
        message: null,
        fun: undefined,
        params: null,
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state: any) => state.notification;

export default notificationSlice.reducer;
