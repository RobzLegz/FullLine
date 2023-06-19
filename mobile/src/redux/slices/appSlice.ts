import { createSlice } from "@reduxjs/toolkit";
import { ExCategory } from "../../interfaces/backendTypes";
import { RdxAction } from "../../types/reduxAction";

export interface AppInfo {
  categories: ExCategory[] | null;
  currentCategory: ExCategory | null;
}

const initialState: AppInfo = {
  categories: null,
  currentCategory: null,
};

export const appSlice: any = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCategories: (state, action: RdxAction<ExCategory[] | null>) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    setCurrentCategory: (state, action: RdxAction<ExCategory | null>) => {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },
  },
});

export const { setCategories, setCurrentCategory } = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
