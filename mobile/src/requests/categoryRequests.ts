import axios from "axios";
import { setCategories, setCurrentCategory } from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { CATEGORY_BASE } from "./routes";
import { Dispatch } from "@reduxjs/toolkit";
import { headers } from "../constants/headers";

export const getCategories = async ({
  dispatch,
  token,
}: {
  dispatch: Dispatch;
  token: string | null;
}) => {
  const headrs = headers(token);

  await axios
    .get(CATEGORY_BASE, headrs)
    .then((res) => {
      dispatch(setCategories(res.data));
    })
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

export const getCategory = async ({
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
    .get(`${CATEGORY_BASE}/${id}`, headrs)
    .then((res) => {
      dispatch(setCurrentCategory(res.data));
    })
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
