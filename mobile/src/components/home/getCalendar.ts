import { gray } from "../../styles/colors";
import { Category } from "./categories";

export const getCalendar = (categories: Category[]) => {
  let startDate = new Date();
  startDate.setDate(1);

  let endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(1);

  const images = categories
    .flatMap((cat) => cat.images)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

  let calendar: { date: Date; color: string }[][] = [];

  if (images.length > 0) {
    const firstImageDate = new Date(images[0].date);
    firstImageDate.setDate(1);
    startDate = firstImageDate;

    const lastImageDate = new Date(images[images.length - 1].date);

    if (lastImageDate > new Date()) {
      lastImageDate.setMonth(lastImageDate.getMonth() + 1);
      lastImageDate.setDate(0);
      endDate = lastImageDate;
    }
  }

  let month: { date: Date; color: string }[] = [];

  while (startDate <= endDate) {
    const foundImages = images.filter(
      (img) =>
        new Date(img.date).getDate() === startDate.getDate() &&
        new Date(img.date).getMonth() === startDate.getMonth() &&
        new Date(img.date).getFullYear() === startDate.getFullYear()
    );

    if (foundImages.length === 0) {
      month = [{ date: startDate, color: gray }, ...month];
    } else {
      let activeCategories: string[] = [];

      for (const image of foundImages) {
        const cats = categories.filter((cat) =>
          cat.images.some((img) => img.src === image.src)
        );

        activeCategories = [
          ...activeCategories,
          ...cats.map((cat) => cat.color),
        ];
      }

      const activeColor = findMostRepeatedString(activeCategories);
      month = [{ date: startDate, color: activeColor }, ...month];
    }

    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + 1);

    if (nextDate.getMonth() !== startDate.getMonth()) {
      calendar = [month, ...calendar];
      month = [];
    }

    startDate = nextDate;
  }

  return calendar;
};

function findMostRepeatedString(arr: string[]) {
  const stringFrequencyMap = new Map();

  for (const str of arr) {
    if (stringFrequencyMap.has(str)) {
      stringFrequencyMap.set(str, stringFrequencyMap.get(str) + 1);
    } else {
      stringFrequencyMap.set(str, 1);
    }
  }

  let mostRepeatedString = arr[Math.floor(Math.random() * arr.length)];
  let maxFrequency = 1;

  for (const [str, frequency] of stringFrequencyMap.entries()) {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mostRepeatedString = str;
    }
  }

  return mostRepeatedString;
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const createArray = (n: number) => {
  return Array.from({ length: n }, () => "-");
};

export const today = new Date();
today.setUTCHours(23, 59, 59, 999);
