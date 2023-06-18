import { createSlice } from "@reduxjs/toolkit";
import { ExUser } from "../../interfaces/backendTypes";
import { RdxAction } from "../../types/reduxAction";

export interface UserInfo {
  token: null | string;
  info: null | ExUser;
}

const initialState: UserInfo = {
  token: null,
  info: null,
};

export const userSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: RdxAction<string>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    setInfo: (state, action: RdxAction<ExUser | null>) => {
      return {
        ...state,
        info: action.payload,
      };
    },
    setPushNotificationToken: (
      state,
      action: RdxAction<string | null | undefined>
    ) => {
      if (!state.info || !action.payload) {
        return state;
      }

      return {
        ...state,
        info: {
          ...state.info,
          push_notification_token: action.payload,
        },
      };
    },
    setSavedEventIds: (state, action: RdxAction<string[] | string>) => {
      if (!state.info) {
        return;
      }

      if (typeof action.payload === "string") {
        if (state.info.saved_event_ids.some((id) => id === action.payload)) {
          return {
            ...state,
            info: {
              ...state.info,
              saved_event_ids: state.info.saved_event_ids.filter(
                (id) => id !== action.payload
              ),
            },
          };
        }

        return {
          ...state,
          info: {
            ...state.info,
            saved_event_ids: [...state.info.saved_event_ids, action.payload],
          },
        };
      }

      return {
        ...state,
        info: {
          ...state.info,
          saved_event_ids: action.payload,
        },
      };
    },
  },
});

export const { setToken, setInfo, setSavedEventIds, setPushNotificationToken } =
  userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
