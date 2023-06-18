export const generateRandomBetween = (max: number, min: number) =>
  Math.floor(Math.random() * max - min) + min;
