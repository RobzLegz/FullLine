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
  },
});

export const { setToken, setInfo } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
