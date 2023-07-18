import { createSlice } from "@reduxjs/toolkit";
import { RdxAction } from "../../types/reduxAction";
import { Category, categories } from "../../data/categories";
import { FullLineImage } from "../../types/image";

export interface AppInfo {
  categories: Category[];
  currentCategory: Category | null;
  selectedCategories: Category[];
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
    selectCategory: (state, action: RdxAction<Category | null>) => {
      console.log(action.payload)

      if (!action.payload) {
        return {
          ...state,
          selectedCategories: [],
        };
      }

      const selected = state.selectedCategories.some(
        (cat) => cat.id === action.payload?.id
      );
      if (selected) {
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter(
            (cat) => cat.id !== action.payload?.id
          ),
        };
      }

      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.payload],
      };
    },
    postImage: (state, action: RdxAction<FullLineImage>) => {
      if (state.selectedCategories.length === 0) {
        return state;
      }

      const newCategories = state.selectedCategories.map((cat) => {
        return { ...cat, images: [...cat.images, action.payload] };
      });

      return {
        ...state,
        categories: newCategories,
      };
    },
  },
});

export const { setCategories, setCurrentCategory, selectCategory, postImage } =
  appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
