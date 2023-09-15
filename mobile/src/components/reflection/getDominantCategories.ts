import { Category } from "../home/categories";
import { dominant } from "./data";

export const getDominantCategories = (categories: Category[]) => {
  const currentCategories = categories.map((cat) => ({
    ...cat,
    images: cat.images.filter((img) => new Date(img.date) > lastMonth),
  }));

  const imageLen = Array.from(
    new Set(
      currentCategories.flatMap((cat) =>
        cat.images.map(
          (img) =>
            `${new Date(img.date).getDate()}-${new Date(
              img.date
            ).getMonth()}-${new Date(img.date).getFullYear()}`
        )
      )
    )
  ).length;

  console.log(imageLen);

  if (imageLen < 7) {
    return null;
  }

  const categoryCounter = currentCategories.map((cat) => cat.images.length);

  let domniantValues: number[] = [];
  let passiveValues: number[] = [];

  categoryCounter.forEach((count, i) => {
    let isDominant = false;
    let isPassive = false;

    categoryCounter.forEach((c, j) => {
      if (i !== j) {
        if (count >= c + 3) {
          isDominant = true;
        }

        if (count + 3 <= c) {
          
          isPassive = true;
        }
      }
    });

    if (isDominant) {
      domniantValues = [...domniantValues, i];
    } else if (isPassive) {
      passiveValues = [...passiveValues, i];
    }
  });

  if (!domniantValues.length && !passiveValues.length) {
    return null;
  }

  return [
    ...domniantValues.map((i) => ({
      text: dominant[i],
      icon: categories[i].icon,
      score: 1,
    })),
    ...passiveValues.map((i) => ({
      text: dominant[i],
      icon: categories[i].icon,
      score: 0,
    })),
  ];
};

const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth.setDate(lastMonth.getDate() - 1);
