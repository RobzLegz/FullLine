import { headers } from "../constants/headers";
import { ExCategory } from "../interfaces/backendTypes";
import {
  addToSaved,
  setCurrentEvent,
  setEvents,
  setMapSearchResults,
  setMapSpots,
  setModalEvents,
  setSavedEvents,
  setSearchResults,
} from "../redux/slices/appSlice";
import {
  clearNotification,
  setNotification,
} from "../redux/slices/notificationSlice";
import { setSavedEventIds } from "../redux/slices/userSlice";
import axios from "axios";
import {
  CLICK_TICKET_ROUTE,
  EVENT_BASE_V2,
  EVENT_SEARCH_ROUTE,
  GET_MANY_FROM_IDS_ROUTE,
  MAP_EVENT_ROUTE,
  SAVED_EVENT_ROUTE,
  SAVE_EVENT_ROUTE,
  UNSAVE_EVENT_ROUTE,
} from "./routes";

export const getMapEvents = async ({
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
    .get(`${MAP_EVENT_ROUTE}?country=${country}`, headrs)
    .then(async function (res) {
      const { events } = res.data;

      dispatch(setEvents({ sorted: events, unsorted: [] }));
    })
    .catch((err) => {
      if (!err.response) {
        return console.error(err);
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

export const searchMapEvents = async ({
  dispatch,
  token,
  city,
  startDate,
  endDate,
  categories,
}: {
  dispatch: any;
  token: string | null;
  city?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  categories?: ExCategory[] | null;
}) => {
  const headrs = headers(token);

  const body = {
    city,
    start_date: startDate,
    end_date: endDate,
    categoryIds:
      categories && categories.length > 0
        ? categories.map((c) => c.id)
        : undefined,
  };

  await axios
    .post(MAP_EVENT_ROUTE, body, headrs)
    .then(async function (res) {
      const { events, spots } = res.data;

      dispatch(setEvents({ sorted: events, unsorted: [] }));
      dispatch(setMapSpots(spots));
      dispatch(setMapSearchResults({ events, spots }));
    })
    .catch((err) => {
      if (!err.response) {
        return console.error(err);
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
    .get(`${EVENT_BASE_V2}/${id}`, headrs)
    .then((res) => {
      dispatch(setCurrentEvent(res.data.event));
    })
    .catch((err) => {
      if (!err.response) {
        return console.error(err);
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

export const searchEvents = async ({
  token,
  dispatch,
  query,
  city,
  categories,
  startDate,
  endDate,
}: {
  dispatch: any;
  token: string | null;
  query: string;
  city?: string;
  categories?: ExCategory[] | null;
  startDate: Date | null;
  endDate: Date | null;
}) => {
  const headrs = headers(token);

  const categoryIds = categories?.map((category) => category.id);

  const data = {
    categoryIds,
    query,
    city,
    start_date: startDate,
    end_date: endDate,
  };

  await axios.post(EVENT_SEARCH_ROUTE, data, headrs).then((res) => {
    const { events } = res.data;

    dispatch(setSearchResults(events));
    dispatch(setEvents({ sorted: [], unsorted: events }));
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

  await axios.post(`${CLICK_TICKET_ROUTE}/${id}`, {}, headrs);
};

export const saveEvent = async ({
  id,
  dispatch,
  token,
}: {
  id: string;
  dispatch: any;
  token: string | null;
}) => {
  const headrs = headers(token);

  dispatch(setSavedEventIds(id));

  await axios
    .post(`${SAVE_EVENT_ROUTE}/${id}`, {}, headrs)
    .then((res) => {
      if (res.data.event) {
        dispatch(addToSaved(res.data.event));
      }
    })
    .catch((err) => {
      if (!err.response) {
        return console.error(err);
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

export const unsaveEvent = async ({
  id,
  dispatch,
  token,
}: {
  id: string;
  dispatch: any;
  token: string | null;
}) => {
  const headrs = headers(token);

  dispatch(setSavedEventIds(id));

  await axios.post(`${UNSAVE_EVENT_ROUTE}/${id}`, {}, headrs).catch((err) => {
    if (!err.response) {
      return console.error(err);
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

export const getSavedEvents = async ({
  dispatch,
  token,
}: {
  dispatch: any;
  token: string | null;
}) => {
  dispatch(setNotification({ type: "local_loading" }));

  const headrs = headers(token);

  await axios
    .get(SAVED_EVENT_ROUTE, headrs)
    .then((res) => {
      dispatch(setSavedEvents(res.data.events));
      dispatch(clearNotification());
    })
    .catch((err) => {
      if (!err.response) {
        return console.error(err);
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

export const getEventsByIds = async ({
  ids,
  dispatch,
  token,
}: {
  ids: string[];
  dispatch: any;
  token: string | null;
}) => {
  const headrs = headers(token);

  const idsString = ids.join(";");

  await axios
    .get(`${GET_MANY_FROM_IDS_ROUTE}?ids=${idsString}`, headrs)
    .then((res) => {
      dispatch(setModalEvents(res.data.events));
    })
    .catch((err) => {
      if (!err.response) {
        return console.error(err);
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
