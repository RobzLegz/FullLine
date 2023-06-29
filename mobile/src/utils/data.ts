import { db } from "./database";

export const getImages = () => {
  const images = db.getImages();

  console.log(images);
};
