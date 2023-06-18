import { createSlice } from "@reduxjs/toolkit";
import { ChartData } from "chart.js";
import { isSameDay } from "date-fns";
import {
  ExCategory,
  ExEvent,
  ExPartner,
  ExSpot,
  ExProduct,
} from "../../interfaces/backendTypes";
import { Payload } from "../../types/reduxPayload";
import { City, Country, ProductCategory } from "../../interfaces/backendSafe";

export interface AppInfo {
  info: ExPartner | null;
  popularEvents: ExEvent[] | null;
  events: ExEvent[] | null;
  categories: ExCategory[] | null;
  selectedCategories: ExCategory[];
  startDate: string | null;
  spotProducts: ExProduct[];
  endDate: string | null;
  currentEvent: ExEvent | null;
  countries: Country[] | null;
  spots: ExSpot[] | null;
  currentSpot: ExSpot | null;
  productCategories: ProductCategory[] | null;
  cities: City[] | null;
  viewChartData: ChartData<"line", number[], number> | null;
}

const initialState: AppInfo = {
  info: null,
  popularEvents: null,
  events: null,
  viewChartData: null,
  productCategories: null,
  categories: null,
  startDate: null,
  endDate: null,
  currentEvent: null,
  currentSpot: null,
  countries: null,
  cities: null,
  spots: null,
  spotProducts: [],
  selectedCategories: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInfo: (state, action: Payload<ExPartner | null>) => {
      return {
        ...state,
        info: action.payload,
      };
    },
    setSpots: (state, action: Payload<ExSpot[] | null>) => {
      return {
        ...state,
        spots: action.payload,
      };
    },
    deleteSpotRdx: (state, action: Payload<string>) => {
      if (!state.spots) {
        return;
      }

      return {
        ...state,
        spots: state.spots.filter((spot) => spot.id !== action.payload),
      };
    },
    deleteProductRdx: (state, action: Payload<string>) => {
      if (!state.spotProducts) {
        return;
      }

      return {
        ...state,
        spotProducts: state.spotProducts.filter(
          (prod) => prod.id !== action.payload
        ),
      };
    },
    setSpotProducts: (state, action: Payload<ExProduct[]>) => {
      return {
        ...state,
        spotProducts: action.payload,
      };
    },
    addSpotProduct: (state, action: Payload<ExProduct>) => {
      return {
        ...state,
        spotProducts: [...state.spotProducts, action.payload],
      };
    },
    setCurrentEvent: (state, action: Payload<ExEvent | null>) => {
      return {
        ...state,
        currentEvent: action.payload,
      };
    },
    setCurrentSpot: (state, action: Payload<ExSpot | null>) => {
      return {
        ...state,
        currentSpot: action.payload,
      };
    },
    selectCategory: (state, action: Payload<string>) => {
      if (!state.categories) {
        return state;
      }

      if (state.selectedCategories.some((cat) => cat.id === action.payload)) {
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter(
            (cat) => cat.id !== action.payload
          ),
        };
      }

      const foundCat = state.categories.find(
        (category) => category.id === action.payload
      );
      if (!foundCat) {
        return state;
      }

      return {
        ...state,
        selectedCategories: [...state.selectedCategories, foundCat],
      };
    },
    unselectCategories: (state) => {
      return {
        ...state,
        selectedCategories: [],
      };
    },
    setCategories: (state, action: Payload<ExCategory[]>) => {
      state = {
        ...state,
        categories: action.payload,
      };

      return state;
    },
    setProductCategories: (state, action: Payload<ProductCategory[]>) => {
      state = {
        ...state,
        productCategories: action.payload,
      };

      return state;
    },
    setCountries: (state, action: Payload<Country[]>) => {
      state = {
        ...state,
        countries: action.payload,
      };

      return state;
    },
    setCities: (state, action: Payload<City[]>) => {
      state = {
        ...state,
        cities: action.payload,
      };

      return state;
    },
    addCategory: (state, action: Payload<ExCategory>) => {
      state = {
        ...state,
        categories: state.categories
          ? [...state.categories, action.payload]
          : [action.payload],
      };

      return state;
    },
    addProductCategory: (state, action: Payload<ProductCategory>) => {
      state = {
        ...state,
        productCategories: state.productCategories
          ? [...state.productCategories, action.payload]
          : [action.payload],
      };

      return state;
    },
    addEvent: (state, action: Payload<ExEvent>) => {
      state = {
        ...state,
        events: state.events
          ? [action.payload, ...state.events]
          : [action.payload],
      };

      return state;
    },
    addSpot: (state, action: Payload<ExSpot>) => {
      state = {
        ...state,
        spots: state.spots
          ? [action.payload, ...state.spots]
          : [action.payload],
      };

      return state;
    },
    setEvents: (state, action: Payload<ExEvent[]>) => {
      let events: ExEvent[] = state.events ? state.events : [];

      for (const event of action.payload) {
        if (events.some((e) => e.id === event.id)) {
          continue;
        }

        events = [...events, event];
      }

      return {
        ...state,
        events,
      };
    },
    setViewChartData: (
      state,
      action: Payload<ChartData<"line", number[], number> | null>
    ) => {
      return {
        ...state,
        viewChartData: action.payload,
      };
    },
    setPopularEvents: (state, action: Payload<ExEvent[]>) => {
      return {
        ...state,
        popularEvents: action.payload,
      };
    },
    deleteEventRdx: (state, action: Payload<string>) => {
      if (!state.events) {
        return state;
      }

      return {
        ...state,
        events: state.events.filter((ev) => ev.id !== action.payload),
        popularEvents: state.popularEvents
          ? state.popularEvents.filter((ev) => ev.id !== action.payload)
          : null,
      };
    },
    deleteProductCategoryRdx: (state, action: Payload<string>) => {
      if (!state.productCategories) {
        return state;
      }

      return {
        ...state,
        productCategories: state.productCategories.filter(
          (ev) => ev.id !== action.payload
        ),
      };
    },
    updateEventRdx: (state, action: Payload<ExEvent>) => {
      if (!state.events || !state.popularEvents) {
        return state;
      }

      return {
        ...state,
        events: state.events.map((ev) =>
          ev.id === action.payload.id ? action.payload : ev
        ),
        popularEvents: state.popularEvents.map((ev) =>
          ev.id === action.payload.id ? action.payload : ev
        ),
      };
    },
    updateProductRdx: (state, action: Payload<ExProduct>) => {
      if (!state.spotProducts) {
        return state;
      }

      return {
        ...state,
        spotProducts: state.spotProducts.map((ev) =>
          ev.id === action.payload.id ? action.payload : ev
        ),
      };
    },
    updateSpotRdx: (state, action: Payload<ExSpot>) => {
      if (!state.spots) {
        return state;
      }

      return {
        ...state,
        spots: state.spots.map((ev) =>
          ev.id === action.payload.id ? action.payload : ev
        ),
      };
    },
    setStartDate: (state, action: Payload<string | null>) => {
      if (!action.payload) {
        return {
          ...state,
          startDate: null,
          endDate: null,
        };
      }

      if (
        state.startDate &&
        new Date(action.payload) < new Date(state.startDate)
      ) {
        return {
          ...state,
          startDate: null,
          endDate: null,
        };
      }

      if (
        state.startDate &&
        isSameDay(new Date(state.startDate), new Date(action.payload))
      ) {
        if (state.endDate) {
          return {
            ...state,
            startDate: null,
            endDate: null,
          };
        }

        return {
          ...state,
          startDate: null,
        };
      }

      if (
        state.endDate &&
        isSameDay(new Date(state.endDate), new Date(action.payload))
      ) {
        return {
          ...state,
          endDate: null,
        };
      }

      if (state.startDate) {
        return {
          ...state,
          endDate: action.payload,
        };
      }

      return {
        ...state,
        startDate: action.payload,
      };
    },
  },
});

export const {
  setInfo,
  setPopularEvents,
  setEvents,
  setViewChartData,
  setCategories,
  addCategory,
  deleteEventRdx,
  setStartDate,
  addEvent,
  setCurrentSpot,
  selectCategory,
  setCurrentEvent,
  updateEventRdx,
  updateProductRdx,
  updateSpotRdx,
  deleteSpotRdx,
  setCities,
  addSpotProduct,
  deleteProductRdx,
  deleteProductCategoryRdx,
  setSpotProducts,
  setCountries,
  setProductCategories,
  addProductCategory,
  setSpots,
  addSpot,
  unselectCategories,
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
