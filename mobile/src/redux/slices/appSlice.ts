import { createSlice } from "@reduxjs/toolkit";
import { RdxAction } from "../../types/reduxAction";
import { Category, categories } from "../../data/categories";
import { FullLineImage } from "../../types/image";

export interface AppInfo {
  categories: Category[];
  currentCategory: Category | null;
  selectedCategories: number[];
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
    loadState: (state, action: RdxAction<any>) => {
      if (!action.payload) {
        return state;
      }

      return action.payload;
    },
    setCurrentCategory: (state, action: RdxAction<Category | null>) => {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },
    selectCategory: (state, action: RdxAction<number | null>) => {
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
    postImage: (state, action: RdxAction<FullLineImage>) => {
      if (state.selectedCategories.length === 0) {
        return state;
      }

      const newCategories = state.categories.map((cat) => {
        if (state.selectedCategories.some((c) => c === cat.id)) {
          return { ...cat, images: [...cat.images, action.payload] };
        }

        return cat;
      });

      return {
        ...state,
        categories: newCategories,
        selectedCategories: [],
      };
    },
  },
});

export const {
  setCategories,
  setCurrentCategory,
  selectCategory,
  postImage,
  loadState,
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
