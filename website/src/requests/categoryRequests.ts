import axios from "axios";
import { Dispatch } from "redux";
import {
  addCategory,
  addProductCategory,
  deleteProductCategoryRdx,
  setCategories,
  setProductCategories,
} from "../redux/slices/appSlice";
import {
  CATEGORIES_BASE,
  GET_CATEGORIES_ROUTE,
  PRODUCT_CATEGORIES_BASE,
} from "./routes";

export const getCategories = async ({ dispatch }: { dispatch: Dispatch }) => {
  await axios
    .get(GET_CATEGORIES_ROUTE, { withCredentials: true })
    .then((res) => {
      dispatch(setCategories(res.data.categories));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createCategory = async ({
  dispatch,
  name,
}: {
  dispatch: Dispatch;
  name: string;
}) => {
  const body = { name: name };
  await axios
    .post(CATEGORIES_BASE, body, { withCredentials: true })
    .then((res) => {
      dispatch(addCategory(res.data.category));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductCategories = async ({
  dispatch,
  spotId,
}: {
  dispatch: Dispatch;
  spotId: string;
}) => {
  await axios
    .get(`${PRODUCT_CATEGORIES_BASE}/${spotId}`, { withCredentials: true })
    .then((res) => {
      dispatch(setProductCategories(res.data.categories));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProductCategory = async ({
  dispatch,
  name,
  description,
  spotId,
}: {
  dispatch: Dispatch;
  name: string;
  description?: string;
  spotId?: string;
}) => {
  const body = { name, description, spotId };

  await axios
    .post(PRODUCT_CATEGORIES_BASE, body, { withCredentials: true })
    .then((res) => {
      dispatch(addProductCategory(res.data.category));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProductCategory = async ({
  dispatch,
  id,
}: {
  dispatch: Dispatch;
  id: string;
}) => {
  dispatch(deleteProductCategoryRdx(id));

  await axios
    .delete(`${PRODUCT_CATEGORIES_BASE}/${id}`, { withCredentials: true })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};
