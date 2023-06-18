import axios from "axios";
import { headers } from "../constants/headers";
import { CLICK_SPOT_WEBSITE_ROUTE, MAP_SPOT_ROUTE, SPOT_BASE } from "./routes";
import {
  setCurrentEvent,
  setCurrentSpot,
  setMapSpots,
} from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";

export const getMapSpots = async ({
  dispatch,
  token,
  country,
}: {
  dispatch: any;
  token: string | null;
  country: string;
}) => {
  const headrs = headers(token);

  await axios
    .get(`${MAP_SPOT_ROUTE}/${country}`, headrs)
    .then((res) => {
      const { spots } = res.data;

      dispatch(setMapSpots(spots));
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

export const clickWebsiteUrl = async ({
  id,
  token,
}: {
  id?: string | null;
  token?: string | null;
}) => {
  if (!id || !token) {
    return;
  }

  const headrs = headers(token);

  await axios.post(`${CLICK_SPOT_WEBSITE_ROUTE}/${id}`, {}, headrs);
};

export const getSpotById = async ({
  id,
  dispatch,
  token,
}: {
  id: string;
  dispatch: any;
  token: string | null;
}) => {
  dispatch(setCurrentEvent(null));

  const headrs = headers(token);

  await axios
    .get(`${SPOT_BASE}/${id}`, headrs)
    .then((res) => {
      dispatch(setCurrentSpot(res.data.spot));
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
