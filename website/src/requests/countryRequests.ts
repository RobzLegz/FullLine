import { Dispatch } from "redux";
import { GET_COUNTRIES_ROUTE } from "./routes";
import axios from "axios";
import { setCountries } from "../redux/slices/appSlice";

export const getCountries = async ({ dispatch }: { dispatch: Dispatch }) => {
  await axios
    .get(GET_COUNTRIES_ROUTE, { withCredentials: true })
    .then((res) => {
      dispatch(setCountries(res.data.countries));
    })
    .catch((err) => {
      console.log(err);
    });
};
