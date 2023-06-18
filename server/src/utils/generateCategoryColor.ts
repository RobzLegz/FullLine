import { generateRandomBetween } from "./generateRandomBetween";

export const generateColor = () => {
  return availableColors[generateRandomBetween(availableColors.length - 1, 0)];
};

const availableColors = [
  "#771F49",
  "#BE1953",
  "#EB3355",
  "#F4891D",
  "#D00049",
  "#2DCB1F",
  "#EA900A",
  "#1EC9E0",
  "#1E8FE0",
  "#7F1EE0",
  "#D11EE0",
  "#E01E9E",
];
