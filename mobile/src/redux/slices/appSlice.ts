import { createSlice } from "@reduxjs/toolkit";
import {
  ExCategory,
  ExCity,
  ExCountry,
  ExEvent,
  ExSpot,
} from "../../interfaces/backendTypes";
import { RdxAction } from "../../types/reduxAction";
import { isSameDay } from "../../utils/spot_date";
import { NearbyEvent, NearbySpot } from "../../interfaces/extendedTypes";

export interface NearbyData {
  events: NearbyEvent[];
  spots: NearbySpot[];
}

export interface Coords {
  lat: number | null;
  lng: number | null;
}

export interface AppInfo {
  mapEvents: ExEvent[] | null;
  mapSearchResults: {
    events: ExEvent[] | null;
    spots: ExSpot[] | null;
  } | null;
  mapSpots: ExSpot[] | null;
  currentSpot: ExSpot | null;
  userCoords: Coords | null;
  events: ExEvent[] | null;
  searchResults: ExEvent[] | null;
  categories: ExCategory[] | null;
  cities: ExCity[] | null;
  spotCategories: ExCategory[] | null;
  selectedCategories: ExCategory[];
  searchCategories: ExCategory[] | null;
  feed: ExCategory[] | null;
  recomendations: ExCategory[] | null;
  feedEvents: ExCategory[] | null;
  currentEvent: ExEvent | null;
  selectedCity: ExCity;
  selectedCountry: ExCountry;
  countries: ExCountry[] | null;
  searchCity: ExCity | null;
  modalEvents: ExEvent[] | null;
  popmodal: number;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  modalSpots: ExSpot[] | null;
  currentCategory: ExCategory | null;
  savedEvents: ExEvent[] | null;
  categoryLocalEvents: ExEvent[] | null;
  nearbyData: NearbyData | null;
  filterMapEvents: number;
}

const initialState: AppInfo = {
  mapEvents: null,
  mapSpots: null,
  mapSearchResults: null,
  userCoords: null,
  spotCategories: null,
  events: null,
  recomendations: null,
  modalEvents: null,
  nearbyData: null,
  searchResults: null,
  categories: null,
  selectedCategories: [],
  searchCategories: null,
  currentEvent: null,
  currentSpot: null,
  filterMapEvents: 0,
  cities: null,
  countries: null,
  selectedCity: {
    name: "Rīga",
    id: "63de0a214030f8924291cad2",
    lat: 56.9663848,
    lng: 24.1334868,
    countryId: "",
    priority: 1,
    verified: true,
  },
  selectedCountry: {
    id: "64450f18e843597154f1d832",
    name: "Latvija",
    verified: true,
    en_name: "Latvia",
    short: "LV",
    flag: "https://www.worldometers.info/img/flags/lg-flag.gif",
  },
  popmodal: 0,
  feed: null,
  feedEvents: null,
  selectedStartDate: null,
  selectedEndDate: null,
  currentCategory: null,
  modalSpots: null,
  savedEvents: null,
  categoryLocalEvents: null,
  searchCity: null,
};

export const appSlice: any = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPopmodal: (state, action: RdxAction<number>) => {
      return {
        ...state,
        popmodal: action.payload,
      };
    },
    setFilterMapEvents: (state, action: RdxAction<number>) => {
      return {
        ...state,
        filterMapEvents: action.payload,
      };
    },
    setCoords: (state, action: RdxAction<Coords>) => {
      return {
        ...state,
        userCoords: action.payload,
      };
    },
    setSearchCity: (state, action: RdxAction<ExCity | null>) => {
      return {
        ...state,
        searchCity: action.payload,
      };
    },
    setModalEvents: (state, action: RdxAction<ExEvent[] | null>) => {
      return {
        ...state,
        modalEvents: action.payload,
      };
    },
    setMapSearchResults: (
      state,
      action: RdxAction<{
        events: ExEvent[] | null;
        spots: ExSpot[] | null;
      } | null>
    ) => {
      return {
        ...state,
        mapSearchResults: action.payload,
      };
    },
    setFeed: (state, action: RdxAction<ExCategory[]>) => {
      return {
        ...state,
        feed: action.payload,
      };
    },
    setFeedEvents: (state, action: RdxAction<ExCategory[]>) => {
      return {
        ...state,
        feedEvents: action.payload,
      };
    },
    setEventRecomendations: (state, action: RdxAction<ExCategory[]>) => {
      return {
        ...state,
        recomendations: action.payload,
      };
    },
    setNearbyData: (state, action: RdxAction<NearbyData | null>) => {
      return {
        ...state,
        nearbyData: action.payload,
      };
    },
    setSearchCategories: (state, action: RdxAction<ExCategory[]>) => {
      return {
        ...state,
        searchCategories: action.payload,
      };
    },
    setSelectedCategories: (state, action: RdxAction<ExCategory[]>) => {
      return {
        ...state,
        selectedCategories: action.payload,
      };
    },
    addToSaved: (state, action: RdxAction<ExEvent>) => {
      if (state.savedEvents) {
        if (state.savedEvents.some((e) => e.id === action.payload.id)) {
          return state;
        }

        return {
          ...state,
          savedEvents: [...state.savedEvents, action.payload].sort((a, b) =>
            !a.start_date
              ? -1
              : !b.start_date
              ? 1
              : new Date(a.start_date) < new Date(b.start_date)
              ? -1
              : 1
          ),
        };
      }
    },
    setCurrentEvent: (state, action: RdxAction<ExEvent | null>) => {
      return {
        ...state,
        currentEvent: action.payload,
      };
    },
    setCurrentSpot: (state, action: RdxAction<ExSpot | null>) => {
      return {
        ...state,
        currentSpot: action.payload,
      };
    },
    setModalSpots: (state, action: RdxAction<ExSpot[] | null>) => {
      return {
        ...state,
        modalSpots: action.payload,
      };
    },
    setSavedEvents: (state, action: RdxAction<ExEvent[] | null>) => {
      return {
        ...state,
        savedEvents: action.payload,
      };
    },
    setSelectedCity: (state, action: RdxAction<ExCity>) => {
      return {
        ...state,
        selectedCity: action.payload,
      };
    },
    setSelectedCountry: (state, action: RdxAction<ExCountry>) => {
      return {
        ...state,
        selectedCountry: action.payload,
      };
    },
    setSearchResults: (state, action: RdxAction<ExEvent[] | null>) => {
      if (!action.payload) {
        return {
          ...state,
          searchResults: null,
        };
      }

      return {
        ...state,
        searchResults: action.payload,
      };
    },
    setCategories: (state, action: RdxAction<ExCategory[] | null>) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    setSpotCategories: (state, action: RdxAction<ExCategory[] | null>) => {
      return {
        ...state,
        spotCategories: action.payload,
      };
    },
    setMapSpots: (state, action: RdxAction<ExSpot[] | null>) => {
      if (!action.payload) {
        return {
          ...state,
          mapSpots: null,
        };
      }

      let mapSpots: ExSpot[] = state.mapSpots ? state.mapSpots : [];

      for (const spot of action.payload) {
        if (mapSpots.some((e) => e.id === spot.id)) {
          continue;
        }

        mapSpots = [...mapSpots, spot];
      }

      return {
        ...state,
        mapSpots: action.payload,
      };
    },
    setCountries: (state, action: RdxAction<ExCountry[] | null>) => {
      return {
        ...state,
        countries: action.payload,
      };
    },
    setCurrentCategory: (state, action: RdxAction<ExCategory | null>) => {
      state = { ...state, categoryLocalEvents: null };

      let categoryLocalEvents: ExEvent[] | null = null;
      let foundCategory = action.payload;

      if (state.feedEvents && foundCategory) {
        categoryLocalEvents = [];

        const feedCats = state.feedEvents.filter(
          (cat) => cat.id === foundCategory?.id
        );

        for (const cat of feedCats) {
          if (!cat.events) {
            continue;
          }
          for (const event of cat.events) {
            categoryLocalEvents = [...categoryLocalEvents, event];
          }
        }

        foundCategory = {
          ...foundCategory,
          events: foundCategory.events
            ? foundCategory.events.filter(
                (ev) => !categoryLocalEvents?.some((eve) => eve.id === ev.id)
              )
            : [],
        };
      }

      if (!categoryLocalEvents || categoryLocalEvents.length === 0) {
        categoryLocalEvents = null;
      }

      return {
        ...state,
        currentCategory: foundCategory,
        categoryLocalEvents,
      };
    },
    setCities: (state, action: RdxAction<ExCity[]>) => {
      let newCities: ExCity[] = state.cities ? state.cities : [];

      for (const city of action.payload) {
        if (newCities?.some((e) => e.id === city.id)) {
          continue;
        }
        newCities = [...newCities, city];
      }

      return {
        ...state,
        cities: newCities,
      };
    },
    selectCategory: (state, action: RdxAction<ExCategory>) => {
      if (state.selectedCategories.some((c) => c.id === action.payload.id)) {
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter(
            (c) => c.id !== action.payload.id
          ),
        };
      }

      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.payload],
      };
    },
    setEvents: (
      state,
      action: RdxAction<{
        sorted: ExEvent[];
        unsorted: ExEvent[];
      }>
    ) => {
      let newEvents: ExEvent[] = state.mapEvents ? state.mapEvents : [];

      for (const event of action.payload.sorted) {
        if (newEvents?.some((e) => e.id === event.id)) {
          continue;
        }
        newEvents = [...newEvents, event];
      }

      let events: ExEvent[] = state.events ? state.events : [];

      for (const event of action.payload.unsorted) {
        if (events.some((e) => e.id === event.id)) {
          continue;
        }

        events = [...events, event];
      }

      return {
        ...state,
        mapEvents: newEvents,
        events: events,
      };
    },
    getSpecificEvent: (state, action: RdxAction<ExEvent>) => {
      if (!state.mapEvents) {
        return state;
      }

      const newEvents = state.mapEvents.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        }

        return event;
      });

      return {
        ...state,
        mapEvents: newEvents,
      };
    },
    setSelectedStartDate: (state, action: RdxAction<Date | null>) => {
      if (!action.payload) {
        return {
          ...state,
          selectedStartDate: null,
          selectedEndDate: null,
        };
      }

      if (state.selectedStartDate && action.payload < state.selectedStartDate) {
        return {
          ...state,
          selectedStartDate: null,
          selectedEndDate: null,
        };
      }

      if (
        state.selectedStartDate &&
        isSameDay(state.selectedStartDate, action.payload)
      ) {
        if (state.selectedEndDate) {
          return {
            ...state,
            selectedStartDate: null,
            selectedEndDate: null,
          };
        }

        return {
          ...state,
          selectedStartDate: null,
        };
      }

      if (
        state.selectedEndDate &&
        isSameDay(state.selectedEndDate, action.payload)
      ) {
        return {
          ...state,
          selectedEndDate: null,
        };
      }

      if (state.selectedStartDate) {
        return {
          ...state,
          selectedEndDate: action.payload,
        };
      }

      return {
        ...state,
        selectedStartDate: action.payload,
      };
    },
  },
});

export const {
  setCities,
  setEvents,
  setCategories,
  selectCategory,
  setSelectedCity,
  setSearchResults,
  updateWhenIndex,
  setCurrentEvent,
  getSpecificEvent,
  setPopmodal,
  setMapLoaded,
  setLocationEvents,
  setSearchCategories,
  setFeed,
  setSelectedStartDate,
  setMapSpots,
  setSelectedCategories,
  setCurrentCategory,
  setModalSpots,
  setSavedEvents,
  setModalEvents,
  setMapSearchResults,
  addToSaved,
  selectSpotCategory,
  setNearbyData,
  setFilterMapEvents,
  setCoords,
  setSpotCategories,
  setEventRecomendations,
  setCurrentSpot,
  setCurrentOrganizer,
  setFeedEvents,
  setSearchCity,
  setCountries,
  setSelectedCountry,
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
