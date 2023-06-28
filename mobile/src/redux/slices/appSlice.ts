import { createSlice } from "@reduxjs/toolkit";
import { ExCategory } from "../../interfaces/backendTypes";
import { RdxAction } from "../../types/reduxAction";

export interface AppInfo {
  categories: ExCategory[] | null;
  currentCategory: ExCategory | null;
  selectedCategories: string[];
}

const initialState: AppInfo = {
  categories: null,
  currentCategory: null,
  selectedCategories: [],
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
    selectCategory: (state, action: RdxAction<string | null>) => {
      if (!action.payload) {
        return {
          ...state,
          selectedCategories: [],
        };
      }

      const selected = state.selectedCategories.some(
        (cat) => cat === action.payload
      );
      if (selected) {
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter(
            (cat) => cat !== action.payload
          ),
        };
      }

      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.payload],
      };
    },
  },
});

export const { setCategories, setCurrentCategory, selectCategory } =
  appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
