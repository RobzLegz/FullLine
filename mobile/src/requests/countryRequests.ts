import axios from "axios";
import { setCountries } from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { COUNTRY_BASE } from "./routes";
import { Dispatch } from "@reduxjs/toolkit";
import { headers } from "../constants/headers";

export const getCountries = async ({
  dispatch,
  token,
}: {
  dispatch: Dispatch;
  token: string | null;
}) => {
  const headrs = headers(token);

  await axios
    .get(COUNTRY_BASE, headrs)
    .then((res) => {
      dispatch(setCountries(res.data.countries));
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
