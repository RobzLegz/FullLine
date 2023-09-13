import { Category, categories } from "../data/categories";

export const getCalendar = (categories: Category[]) => {
  let startDate = new Date();
  startDate.setDate(1);

  let endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(1);

  const images = categories.flatMap((cat) => cat.images);

  let calendar: string[][] = [];

  if (images.length > 0) {
    const firstImageDate = new Date(images[0].date);
    firstImageDate.setDate(0);
    startDate = firstImageDate;

    const lastImageDate = new Date(images[images.length - 1].date);
    lastImageDate.setMonth(lastImageDate.getMonth() + 1);
    lastImageDate.setDate(0);
    endDate = lastImageDate;
  }

  let month: string[] = [];

  while (startDate < endDate) {
    const foundImages = images.filter(
      (img) =>
        new Date(img.date).getDate() === startDate.getDate() &&
        new Date(img.date).getFullYear() === startDate.getFullYear()
    );

    if (foundImages.length === 0) {
      month = [...month, String(startDate.getDate())];
    } else {
      let activeCategories: string[] = [];

      for (const image of foundImages) {
        for (const category of categories) {
          if (category.images.some((img) => img.src === image.src)) {
          }
        }
      }
    }

    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + 1);

    if (nextDate.getMonth() !== startDate.getMonth()) {
      calendar = [...calendar, month];
      month = [];
    }

    startDate = nextDate;
  }

  return calendar;
};
