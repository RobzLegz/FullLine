import { createSlice } from "@reduxjs/toolkit";
import { ExCategory, ExEvent } from "../../interfaces/backendTypes";
import { RdxAction } from "../../types/reduxAction";

interface Memory {
  city: string;
  country: string;
  feed: ExCategory[];
}

export interface MemoryInfo {
  memory: Memory[];
  fullEventInfo: ExEvent[];
  categoryMemory: Record<string, ExCategory[]>;
}

const initialState: MemoryInfo = {
  memory: [],
  fullEventInfo: [],
  categoryMemory: {},
};

export const memorySlice: any = createSlice({
  name: "memory",
  initialState,
  reducers: {
    addToMemory: (state, action: RdxAction<Memory>) => {
      return {
        ...state,
        memory: [...state.memory, action.payload],
      };
    },
    addToFullEventInfo: (state, action: RdxAction<ExEvent>) => {
      return {
        ...state,
        fullEventInfo: [...state.fullEventInfo, action.payload],
      };
    },
    addToCategoryMemory: (
      state,
      action: RdxAction<{ city: string; categories: ExCategory[] }>
    ) => {
      const newCategoryMemory: Record<string, ExCategory[]> = {};
      newCategoryMemory[action.payload.city] = action.payload.categories;

      return {
        ...state,
        categoryMemory: {
          ...state.categoryMemory,
          ...newCategoryMemory,
        },
      };
    },
  },
});

export const { addToMemory, addToFullEventInfo, addToCategoryMemory } =
  memorySlice.actions;

export const selectMemory = (state: any) => state.memory;

export default memorySlice.reducer;
