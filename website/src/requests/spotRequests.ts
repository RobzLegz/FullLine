import axios from "axios";
import { NextRouter } from "next/router";
import { Dispatch } from "redux";
import {
  setCurrentSpot,
  unselectCategories,
  addSpot,
  deleteSpotRdx,
  setSpotProducts,
  updateSpotRdx,
  setProductCategories,
  setSpots,
} from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { uploadFile } from "../utils/uploadFile";
import { ADMIN_SPOT_ROUTE, SPOT_BASE } from "./routes";
import {
  EventImage,
  Product,
  ProductCategory,
} from "../interfaces/backendSafe";
import { ExSpot } from "../interfaces/backendTypes";

interface SpotCreateBody {
  name: string;
  description: string;
  websiteUrl: string;
  cityId: string;
  address: string;
  countryId: string;
  categoryIds: string[];
  phoneNumber?: string;
  email?: string;
  banner?: EventImage;
  cover: EventImage;
  images: EventImage[];
  products: Product[];
  productCategories: ProductCategory[];
}

export const createSpot = async ({
  dispatch,
  name,
  description,
  websiteUrl,
  cityId,
  address,
  countryId,
  categoryIds,
  phoneNumber,
  email,
  banner,
  images,
  cover,
  productCategories,
  products,
  router,
}: {
  dispatch: Dispatch;
  name: string;
  description: string;
  websiteUrl: string;
  cityId: string;
  address: string;
  countryId: string;
  categoryIds: string[];
  phoneNumber?: string;
  email?: string;
  banner?: EventImage;
  productCategories: ProductCategory[];
  cover: string | File | null;
  images: (string | File)[];
  products: Product[];
  router: NextRouter;
}) => {
  if (!cover) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Norādiet pasākuma plakātu",
      })
    );
    return;
  }

  let sendImages: { src: string; alt: string }[] = [];

  let coverUrl: string | null = null;

  if (typeof cover === "string") {
    coverUrl = cover;
  } else {
    coverUrl = await uploadFile(cover);
  }

  if (!coverUrl) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Radās kļūme",
      })
    );
    return;
  }

  for (const image of images) {
    if (image === cover) {
      continue;
    }

    if (typeof image === "string") {
      sendImages = [...sendImages, { src: image, alt: name }];
    } else {
      const url = await uploadFile(image);

      if (url) {
        sendImages = [...sendImages, { src: url, alt: name }];
      }
    }
  }

  const body: SpotCreateBody = {
    name,
    description,
    websiteUrl,
    cityId,
    address,
    countryId,
    categoryIds,
    phoneNumber,
    email,
    banner,
    productCategories,
    products,
    cover: {
      src: coverUrl,
      alt: name,
    },
    images: sendImages,
  };

  await axios
    .post(SPOT_BASE, body, { withCredentials: true })
    .then((res) => {
      const { spot }: { spot: ExSpot } = res.data;

      router.push("/profils");

      dispatch(addSpot(spot));
      dispatch(unselectCategories());
      dispatch(setSpotProducts([]));
      dispatch(setCurrentSpot(null));
    })
    .catch((err) => {
      if (!err.response || !err.response.data) {
        console.log(err);
        return false;
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

export const updateSpot = async ({
  id,
  dispatch,
  name,
  description,
  websiteUrl,
  cityId,
  address,
  countryId,
  categoryIds,
  phoneNumber,
  email,
  banner,
  images,
  productCategories,
  cover,
  products,
  router,
}: {
  id: string;
  dispatch: Dispatch;
  name: string;
  description: string;
  websiteUrl: string;
  cityId: string;
  address: string;
  countryId: string;
  categoryIds: string[];
  phoneNumber?: string;
  email?: string;
  banner?: EventImage;
  cover: string | File | null;
  images: (string | File)[];
  products: Product[];
  productCategories: ProductCategory[];
  router: NextRouter;
}) => {
  if (!cover) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Norādiet pasākuma plakātu",
      })
    );
    return;
  }

  let sendImages: { src: string; alt: string }[] = [];

  let coverUrl: string | null = null;

  if (typeof cover === "string") {
    coverUrl = cover;
  } else {
    coverUrl = await uploadFile(cover);
  }

  if (!coverUrl) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Radās kļūme",
      })
    );
    return;
  }

  for (const image of images) {
    if (image === cover) {
      continue;
    }

    if (typeof image === "string") {
      sendImages = [...sendImages, { src: image, alt: name }];
    } else {
      const url = await uploadFile(image);

      if (url) {
        sendImages = [...sendImages, { src: url, alt: name }];
      }
    }
  }

  const body: SpotCreateBody = {
    name,
    description,
    websiteUrl,
    cityId,
    address,
    countryId,
    categoryIds,
    phoneNumber,
    email,
    banner,
    products,
    productCategories,
    cover: {
      src: coverUrl,
      alt: name,
    },
    images: sendImages,
  };

  await axios
    .put(`${SPOT_BASE}/${id}`, body, { withCredentials: true })
    .then((res) => {
      const { spot }: { spot: ExSpot } = res.data;

      router.push("/profils");

      dispatch(setCurrentSpot(null));
      dispatch(updateSpotRdx(spot));
      dispatch(unselectCategories());
      dispatch(setSpotProducts([]));
    })
    .catch((err) => {
      if (!err.response || !err.response.data) {
        console.log(err);
        return false;
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

export const getSpotById = async ({
  dispatch,
  id,
}: {
  dispatch: Dispatch;
  id?: string | string[];
}) => {
  if (typeof id !== "string") {
    return;
  }

  await axios
    .get(`${SPOT_BASE}/${id}?categories=true`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(setCurrentSpot(res.data.spot));
      dispatch(setSpotProducts(res.data.spot.products));
      dispatch(setProductCategories(res.data.spot.product_categories));
    })
    .catch((err) => {
      if (!err.response || !err.response.data) {
        console.log(err);
        return false;
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

export const deleteSpot = async ({
  dispatch,
  id,
}: {
  dispatch: Dispatch;
  id?: string | string[];
}) => {
  if (typeof id !== "string") {
    return;
  }

  await axios
    .delete(`${SPOT_BASE}/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(deleteSpotRdx(id));
    })
    .catch((err) => {
      if (!err.response || !err.response.data) {
        console.log(err);
        return false;
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
