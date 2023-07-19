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
    loadState: (state, action: RdxAction<AppInfo>) => {
      if (!action.payload) {
        return state;
      }

      let { categories } = action.payload;

      const thisWeek = new Date();
      thisWeek.setDate(new Date().getDate() - 7);

      const count = Math.max(
        ...categories.map(
          (c) => c.images.filter((im) => new Date(im.date) >= thisWeek).length
        )
      );

      if (count > 0) {
        categories = categories.map((cat) => {
          const imageCount = cat.images.filter(
            (im) => new Date(im.date) >= thisWeek
          ).length;

          const h = (imageCount / count) * 100;

          console.log(h);

          return {
            ...cat,
            height: imageCount > 0 ? h : 0,
          };
        });
      }

      return {
        ...action.payload,
        categories: categories,
        selectedCategories: [],
      };
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

      const thisWeek = new Date();
      thisWeek.setDate(new Date().getDate() - 7);

      let newCategories = state.categories.map((cat) => {
        if (state.selectedCategories.some((c) => c === cat.id)) {
          return { ...cat, images: [action.payload, ...cat.images] };
        }

        return cat;
      });

      const count = Math.max(
        ...newCategories.map(
          (c) => c.images.filter((im) => new Date(im.date) >= thisWeek).length
        )
      );

      newCategories = state.categories.map((cat) => {
        let rtnrCat = cat;

        if (count > 0) {
          const imageCount = rtnrCat.images.filter(
            (im) => new Date(im.date) >= thisWeek
          ).length;

          rtnrCat = {
            ...rtnrCat,
            height: imageCount > 0 ? (imageCount / count) * 100 : 0,
          };
        }

        return rtnrCat;
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
