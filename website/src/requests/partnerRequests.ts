import axios from "axios";
import { NextRouter } from "next/router";
import {
  LOGIN_ADMIN_ROUTE,
  ADMIN_CHART_ROUTE,
  ADMIN_INFO_ROUTE,
  REGISTER_ADMIN_ROUTE,
  ADMIN_SPOT_ROUTE,
  ADMIN_EVENT_ROUTE,
  ADMIN_POPULAR_ROUTE,
} from "./routes";
import { Dispatch } from "redux";
import {
  clearNotification,
  setNotification,
} from "../redux/slices/notificationSlice";
import {
  setEvents,
  setInfo,
  setPopularEvents,
  setSpots,
  setViewChartData,
} from "../redux/slices/appSlice";
import { uploadFile } from "../utils/uploadFile";

export const registerPartner = async ({
  email,
  name,
  password,
  router,
  dispatch,
}: {
  email: string;
  name: string;
  password: string;
  router: NextRouter;
  dispatch: Dispatch;
}) => {
  if (!email || password.length < 6 || !name) {
    return;
  }

  const data = {
    email,
    name,
    password,
  };

  await axios
    .post(REGISTER_ADMIN_ROUTE, data, { withCredentials: true })
    .then((res) => {
      const { partner } = res.data;

      dispatch(setInfo(partner));

      router.push("/profils");

      localStorage.setItem("prevLogin", "true");
    })
    .catch((err) => {
      localStorage.removeItem("prevLogin");
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

export const loginPartner = async ({
  email,
  password,
  router,
  dispatch,
}: {
  email: string;
  password: string;
  router: NextRouter;
  dispatch: Dispatch;
}) => {
  try {
    if (!email || password.length < 6) {
      return;
    }

    const data = {
      email,
      password,
    };

    await axios
      .post(LOGIN_ADMIN_ROUTE, data, { withCredentials: true })
      .then((res) => {
        const { partner } = res.data;

        dispatch(setInfo(partner));

        router.push("/profils");

        localStorage.setItem("prevLogin", "true");
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
  } catch (err) {
    localStorage.removeItem("prevLogin");
    console.log(err);
  }
};

export const getPartnerInfo = async ({
  router,
  dispatch,
}: {
  router: NextRouter;
  dispatch: Dispatch;
}) => {
  try {
    await axios
      .get(ADMIN_INFO_ROUTE, { withCredentials: true })
      .then((res) => {
        const { partner } = res.data;

        dispatch(setInfo(partner));
      })
      .catch((err) => {
        localStorage.removeItem("prevLogin");
        if (!err.response || !err.response.data) {
          console.log(err);
          router.replace("/auth/login");
          return false;
        }

        const message: string = err.response.data.err;
        dispatch(
          setNotification({
            type: "error",
            message: message,
          })
        );
        router.replace("/auth/login");
      });
  } catch (err) {
    console.log(err);
    localStorage.removeItem("prevLogin");
    router.replace("/auth/login");
  }
};

export const getPartnerSpots = async ({ dispatch }: { dispatch: Dispatch }) => {
  try {
    await axios
      .get(ADMIN_SPOT_ROUTE, { withCredentials: true })
      .then((res) => {
        const { spots } = res.data;

        dispatch(setSpots(spots));
      })
      .catch((err) => {
        if (!err.response || !err.response.data) {
          console.log(err);
        }

        const message: string = err.response.data.err;
        dispatch(
          setNotification({
            type: "error",
            message: message,
          })
        );
      });
  } catch (err) {
    console.log(err);
  }
};

export const getPartnerChart = async ({
  id,
  dispatch,
}: {
  id: string;
  dispatch: Dispatch;
}) => {
  try {
    await axios
      .get(`${ADMIN_CHART_ROUTE}/${id}`, { withCredentials: true })
      .then((res) => {
        const { chartData } = res.data;

        dispatch(setViewChartData(chartData));
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
  } catch (err) {
    console.log(err);
  }
};

export const getPartnerEvents = async ({
  dispatch,
  skip = 0,
}: {
  dispatch: Dispatch;
  skip: number;
}) => {
  try {
    await axios
      .get(`${ADMIN_EVENT_ROUTE}?skip=${skip}`, { withCredentials: true })
      .then((res) => {
        const { events } = res.data;

        dispatch(setEvents(events));
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
  } catch (err) {
    console.log(err);
  }
};

export const getPartnerPopularEvents = async ({
  dispatch,
  id,
}: {
  dispatch: Dispatch;
  id: string;
}) => {
  try {
    await axios
      .get(`${ADMIN_POPULAR_ROUTE}/${id}`, { withCredentials: true })
      .then((res) => {
        const { popular } = res.data;

        dispatch(setPopularEvents(popular));
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
  } catch (err) {
    console.log(err);
  }
};

export const updatePartnerInfo = async ({
  dispatch,
  name,
  email,
  description,
  logo,
  password,
}: {
  dispatch: Dispatch;
  name: string;
  email: string;
  logo: string | File | null;
  description: string;
  password?: string;
}) => {
  try {
    let logoSrc = null;

    if (logo) {
      if (typeof logo === "string") {
        logoSrc = logo;
      } else {
        logoSrc = await uploadFile(logo);
      }
    }

    const data = {
      name,
      logo: logoSrc,
      email,
      password,
      description,
    };

    await axios
      .put(ADMIN_INFO_ROUTE, data, { withCredentials: true })
      .then((res) => {
        const { partner } = res.data;

        dispatch(setInfo(partner));
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
  } catch (err) {
    console.log(err);
  }
};

export const logout = async ({
  dispatch,
  router,
}: {
  dispatch: Dispatch;
  router: NextRouter;
}) => {
  await axios
    .post("/api/logout", {}, { withCredentials: true })
    .then((res) => {
      localStorage.removeItem("prevLogin");
      dispatch(setInfo(null));
      dispatch(setViewChartData(null));
      dispatch(setSpots(null));
      router.replace("/auth/login");
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
