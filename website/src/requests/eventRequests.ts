import axios from "axios";
import { NextRouter } from "next/router";
import { Dispatch } from "redux";
import { ExEvent } from "../interfaces/backendTypes";
import {
  updateEventRdx,
  deleteEventRdx,
  addEvent,
  setCurrentEvent,
  setStartDate,
  unselectCategories,
} from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { uploadFile } from "../utils/uploadFile";
import { validateTime } from "../utils/valid";
import { EVENT_BASE, EVENT_ADMIN_ROUTE, EVENT_ADMIN_ROUTE_V2 } from "./routes";

interface EventCreateBody {
  title: string;
  info: string[];
  start_date: string | Date;
  end_date: string | Date | null;
  start_time: string;
  end_time: string;
  cover: {
    src: string;
    alt: string;
  };
  images: {
    src: string;
    alt: string;
  }[];
  city: string;
  address: string;
  location: string;
  country: string;
  category_ids: string[];
  website_urls: string[];
  ticket_url: string;
}

export const createEvent = async ({
  dispatch,
  title,
  info,
  startDate,
  endDate,
  startTime,
  endTime,
  ticketUrl,
  websiteUrls,
  images,
  cover,
  categories,
  city,
  country,
  address,
  location,
  router,
}: {
  dispatch: Dispatch;
  title: string;
  info: string;
  startDate: string | Date | null;
  endDate: string | Date | null;
  startTime: string;
  endTime: string;
  ticketUrl: string;
  websiteUrls: string;
  images: (string | File)[];
  cover: string | File | null;
  categories: string[];
  city: string;
  country: string;
  address: string;
  location: string;
  router: NextRouter;
}) => {
  if (!startDate) {
    dispatch(
      setNotification({ type: "form_error", message: "Norādiet sākuma datumu" })
    );
    return;
  }

  if (!validateTime(startTime)) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Nepareizs sākuma laika formāts",
      })
    );
    return;
  }

  if (endTime && !validateTime(endTime)) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Nepareizs beigu laika formāts",
      })
    );
    return;
  }

  if (!cover) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Norādiet pasākuma plakātu",
      })
    );
    return;
  }

  const start_date = new Date(startDate);
  const end_date = endDate ? new Date(endDate) : null;

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
      sendImages = [...sendImages, { src: image, alt: title }];
    } else {
      const url = await uploadFile(image);

      if (url) {
        sendImages = [...sendImages, { src: url, alt: title }];
      }
    }
  }

  const body: EventCreateBody = {
    title,
    info: info
      .split("\n")
      .filter((line) => line && line.trim().length && line !== "\n"),
    location,
    start_date: start_date,
    end_date: end_date,
    cover: {
      alt: title,
      src: coverUrl,
    },
    images: sendImages,
    start_time: startTime,
    end_time: endTime,
    ticket_url: ticketUrl,
    website_urls: websiteUrls.split(";"),
    category_ids: categories,
    city,
    country,
    address,
  };

  await axios
    .post(EVENT_BASE, body, { withCredentials: true })
    .then((res) => {
      const { event }: { event: ExEvent } = res.data;

      dispatch(addEvent(event));
      dispatch(unselectCategories());
      dispatch(setStartDate(null));
      dispatch(setCurrentEvent(null));

      router.push("/profils");
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

export const updateEvent = async ({
  id,
  dispatch,
  title,
  info,
  startDate,
  endDate,
  startTime,
  endTime,
  ticketUrl,
  websiteUrls,
  images,
  cover,
  categories,
  city,
  country,
  address,
  location,
  router,
}: {
  id: string;
  dispatch: Dispatch;
  title: string;
  info: string;
  startDate: string | Date | null;
  endDate: string | Date | null;
  startTime: string;
  endTime: string;
  ticketUrl: string;
  websiteUrls: string;
  images: (string | File)[];
  cover: string | File | null;
  categories: string[];
  city: string;
  country: string;
  address: string;
  location: string;
  router: NextRouter;
}) => {
  if (!startDate) {
    dispatch(
      setNotification({ type: "form_error", message: "Norādiet sākuma datumu" })
    );
    return;
  }

  if (!validateTime(startTime)) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Nepareizs sākuma laika formāts",
      })
    );
    return;
  }

  if (endTime && !validateTime(endTime)) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Nepareizs beigu laika formāts",
      })
    );
    return;
  }

  if (!cover) {
    dispatch(
      setNotification({
        type: "form_error",
        message: "Norādiet pasākuma plakātu",
      })
    );
    return;
  }

  const start_date = new Date(startDate);
  const end_date = endDate ? new Date(endDate) : null;

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
      sendImages = [...sendImages, { src: image, alt: title }];
    } else {
      const url = await uploadFile(image);

      if (url) {
        sendImages = [...sendImages, { src: url, alt: title }];
      }
    }
  }

  const body: EventCreateBody = {
    title,
    info: info
      .split("\n")
      .filter((line) => line && line.trim().length && line !== "\n"),
    location,
    start_date: start_date,
    end_date: end_date,
    cover: {
      alt: title,
      src: coverUrl,
    },
    images: sendImages,
    start_time: startTime,
    end_time: endTime,
    ticket_url: ticketUrl,
    website_urls: websiteUrls.split(";"),
    category_ids: categories,
    city,
    country,
    address,
  };

  await axios
    .put(`${EVENT_ADMIN_ROUTE}/${id}`, body, { withCredentials: true })
    .then((res) => {
      const { event }: { event: ExEvent } = res.data;

      dispatch(updateEventRdx(event));
      dispatch(setCurrentEvent(null));
      dispatch(unselectCategories());

      router.push("/profils");
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

export const deleteEvent = async ({
  id,
  dispatch,
}: {
  id: string;
  dispatch: Dispatch;
}) => {
  await axios
    .delete(`${EVENT_ADMIN_ROUTE}/${id}`, { withCredentials: true })
    .then((_res) => {
      dispatch(deleteEventRdx(id));
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

export const getEventById = async ({
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
    .get(`${EVENT_ADMIN_ROUTE_V2}/${id}?categories=true`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(setCurrentEvent(res.data.event));
      dispatch(setStartDate(null));
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
