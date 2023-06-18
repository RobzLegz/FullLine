import axios from "axios";
import {
  setCategories,
  setCurrentCategory,
  setSearchCategories,
  setSelectedCategories,
  setSpotCategories,
} from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { addToCategoryMemory } from "../redux/slices/memorySlice";
import {
  CATEGORY_BASE,
  SEARCH_CATEGORIES_ROUTE,
  SPOT_CATEGORIES_ROUTE,
} from "./routes";
import { headers } from "../constants/headers";
import { ExCategory } from "../interfaces/backendTypes";

export const getSearchCategories = async ({
  dispatch,
  token,
}: {
  dispatch: any;
  token: string | null;
}) => {
  const headrs = headers(token);

  await axios
    .get(SEARCH_CATEGORIES_ROUTE, headrs)
    .then((res) => {
      dispatch(setSearchCategories(res.data.categories));
      dispatch(setCategories(res.data.all));
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

export const getSpotCategories = async ({
  dispatch,
  token,
}: {
  dispatch: any;
  token: string | null;
}) => {
  const headrs = headers(token);

  await axios
    .get(SPOT_CATEGORIES_ROUTE, headrs)
    .then((res) => {
      dispatch(setSpotCategories(res.data.categories));
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

export const getCityCategories = async ({
  dispatch,
  token,
  city,
  memory,
}: {
  dispatch: any;
  token: string | null;
  city?: string;
  memory: Record<string, ExCategory[]>;
}) => {
  if (!city) {
    return;
  }

  dispatch(setCategories(null));

  try {
    const memoryCats = memory[city];
    if (memoryCats) {
      dispatch(setCategories(memoryCats));
      dispatch(setSelectedCategories([]));
      return;
    }
  } catch (err) {}

  const headrs = headers(token);

  await axios
    .get(`${SEARCH_CATEGORIES_ROUTE}/${city}`, headrs)
    .then((res) => {
      dispatch(setCategories(res.data.categories));
      dispatch(addToCategoryMemory({ city, categories: res.data.categories }));
      dispatch(setSelectedCategories([]));
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

export const getCategoryById = async ({
  dispatch,
  token,
  id,
}: {
  dispatch: any;
  token: string | null;
  id: string;
}) => {
  const headrs = headers(token);

  await axios
    .get(`${CATEGORY_BASE}/${id}`, headrs)
    .then((res) => {
      dispatch(setCurrentCategory(res.data.category));
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
