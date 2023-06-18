import axios from "axios";
import { setNotification } from "../redux/slices/notificationSlice";
import { CATEGORY_BASE, IMAGE_BASE } from "./routes";
import { Dispatch } from "@reduxjs/toolkit";
import { headers } from "../constants/headers";

export const postImage = async ({
  dispatch,
  token,
  image,
  description,
  collectionIds,
}: {
  dispatch: Dispatch;
  token: string | null;
  image: any;
  description: string;
  collectionIds: string[];
}) => {
  const headrs = headers(token);

  //enter upload logic here
  const src = "";

  const body = {
    image: src,
    description,
    collectionIds,
  };

  await axios
    .post(IMAGE_BASE, body, headrs)
    .then((res) => {})
    .catch((err) => {
      if (!err.response) {
        return console.log(err);
      }

      const message: string = err.response.data.err;
      dispatch(
        setNotification({
          type: "error",
          message: message,
        })
      );
    });
};

export const deleteImage = async ({
  dispatch,
  token,
  id,
}: {
  dispatch: Dispatch;
  token: string | null;
  id: string;
}) => {
  const headrs = headers(token);

  await axios
    .delete(`${CATEGORY_BASE}/${id}`, headrs)
    .then((res) => {})
    .catch((err) => {
      if (!err.response) {
        return console.log(err);
      }

      const message: string = err.response.data.err;
      dispatch(
        setNotification({
          type: "error",
          message: message,
        })
      );
    });
};
