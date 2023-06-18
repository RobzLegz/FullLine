import axios from "axios";
import { Dispatch } from "redux";
import {
  clearNotification,
  setNotification,
} from "../redux/slices/notificationSlice";
import { uploadFile } from "../utils/uploadFile";
import { PRODUCT_BASE } from "./routes";
import { EventImage, Product } from "../interfaces/backendSafe";
import {
  addSpotProduct,
  deleteProductRdx,
  updateProductRdx,
} from "../redux/slices/appSlice";
import { ExProduct } from "../interfaces/backendTypes";

interface ProductCreateBody {
  title: string;
  description: string;
  price: number;
  cover: EventImage;
  images: EventImage[];
  categoryId: string;
}

export const createProduct = async ({
  dispatch,
  title,
  description,
  price,
  category,
  images,
  cover,
}: {
  dispatch: Dispatch;
  title: string;
  description: string;
  price: string;
  category: string;
  cover: File | string;
  images: (File | string)[];
}) => {
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
        message: "Radās kļūme, mēģiniet vēlreiz",
      })
    );
    return;
  }

  for (const image of images) {
    if (image === cover) {
      continue;
    }

    if (typeof image === "string") {
      sendImages = [...sendImages, { src: image, alt: title }];
    } else {
      const url = await uploadFile(image);

      if (url) {
        sendImages = [...sendImages, { src: url, alt: title }];
      }
    }
  }

  const body: ProductCreateBody = {
    title,
    description,
    price: Number(price),
    cover: {
      src: coverUrl,
      alt: title,
    },
    categoryId: category,
    images: sendImages,
  };

  await axios
    .post(PRODUCT_BASE, body, { withCredentials: true })
    .then((res) => {
      const { product }: { product: ExProduct } = res.data;

      dispatch(addSpotProduct(product));
      dispatch(clearNotification());
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

export const updateProduct = async ({
  id,
  dispatch,
  title,
  description,
  category,
  price,
  images,
  cover,
}: {
  id: string;
  dispatch: Dispatch;
  title: string;
  description: string;
  category: string;
  price: string;
  cover: File | string;
  images: (File | string)[];
}) => {
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
        message: "Radās kļūme, mēģiniet vēlreiz",
      })
    );
    return;
  }

  for (const image of images) {
    if (image === cover) {
      continue;
    }

    if (typeof image === "string") {
      sendImages = [...sendImages, { src: image, alt: title }];
    } else {
      const url = await uploadFile(image);

      if (url) {
        sendImages = [...sendImages, { src: url, alt: title }];
      }
    }
  }

  const body: ProductCreateBody = {
    title,
    description,
    price: Number(price),
    cover: {
      src: coverUrl,
      alt: title,
    },
    categoryId: category,
    images: sendImages,
  };

  await axios
    .put(`${PRODUCT_BASE}/${id}`, body, { withCredentials: true })
    .then((res) => {
      const { product }: { product: ExProduct } = res.data;

      dispatch(updateProductRdx(product));
      dispatch(clearNotification());
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

export const deleteProduct = async ({
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
    .delete(`${PRODUCT_BASE}/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(deleteProductRdx(id));
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
