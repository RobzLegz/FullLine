import { Memory } from "../redux/slices/memorySlice";
import { compareArrays } from "./compareArrays";

export const getEventsFromMemory = (memory: Memory[], filters: string[]) => {
  for (const memoryData of memory) {
    const equal = compareArrays(memoryData.filters, filters);

    if (equal) {
      return {
        response: memoryData.response,
        paginationOver: memoryData.paginationOver,
      };
    }
  }

  return null;
};
