import { createSlice } from "@reduxjs/toolkit";
import { RdxAction } from "../../types/reduxAction";
import { Category, categories } from "../../data/categories";

export interface AppInfo {
  categories: Category[];
  currentCategory: Category | null;
  selectedCategories: string[];
}

const initialState: AppInfo = {
  categories: categories,
  currentCategory: null,
  selectedCategories: [],
};

export const appSlice: any = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentCategory: (state, action: RdxAction<Category | null>) => {
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
