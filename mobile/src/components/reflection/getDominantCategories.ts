import { Category } from "../home/categories";

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

  if (imageLen < 7) {
    return null;
  }

  const categoryCounter = currentCategories.map((cat) => cat.images.length);

  let domniantValues: number[] = [];
  let passiveValues: number[] = [];

  categoryCounter.forEach((count, i) => {
    let isDominant = true;
    let isPassive = true;

    categoryCounter.forEach((c, j) => {
      if (i !== j) {
        if (count <= c + 3) {
          isDominant = false;
        }

        if (count + 3 >= c) {
          isPassive = false;
        }
      }
    });

    if (isDominant) {
      domniantValues = [...domniantValues, i];
    } else if (isPassive) {
      passiveValues = [...passiveValues, i];
    }
  });
};

const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth.setDate(lastMonth.getDate() - 1);
