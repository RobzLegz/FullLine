import axios from "axios";
import { setCities } from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { CITY_BASE } from "./routes";
import { Dispatch } from "@reduxjs/toolkit";
import { headers } from "../constants/headers";

export const getCities = async ({
  dispatch,
  token,
  country = "64450f18e843597154f1d832",
}: {
  dispatch: Dispatch;
  token: string | null;
  country: string | null;
}) => {
  const headrs = headers(token);

  await axios
    .get(`${CITY_BASE}/${country}`, headrs)
    .then((res) => {
      dispatch(setCities(res.data.cities));
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
