import { Dispatch } from "redux";
import { GET_CITIES_ROUTE } from "./routes";
import axios from "axios";
import { setCities } from "../redux/slices/appSlice";

export const getCities = async ({ dispatch }: { dispatch: Dispatch }) => {
  await axios
    .get(GET_CITIES_ROUTE, { withCredentials: true })
    .then((res) => {
      dispatch(setCities(res.data.cities));
    })
    .catch((err) => {
      console.log(err);
    });
};
