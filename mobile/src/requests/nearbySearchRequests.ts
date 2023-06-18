import axios from "axios";
import { NEARBY_SEARCH_BASE } from "./routes";
import { setNearbyData } from "../redux/slices/appSlice";
import { headers } from "../constants/headers";

export const getNearbyData = async ({
  dispatch,
  token,
  lat,
  lng,
}: {
  dispatch: any;
  token: string;
  lat: number;
  lng: number;
}) => {
  const headrs = headers(token);

  await axios
    .get(`${NEARBY_SEARCH_BASE}?lat=${lat}&lng=${lng}`, headrs)
    .then((res) => {
      const { events, spots } = res.data;

      dispatch(setNearbyData({ events, spots }));
    });
};
