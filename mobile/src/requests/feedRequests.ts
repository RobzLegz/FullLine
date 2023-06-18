import { Dispatch } from "@reduxjs/toolkit";
import { clearNotification } from "../redux/slices/notificationSlice";
import { headers } from "../constants/headers";
import { getItemFromStore, saveItem } from "../utils/storeOptions";
import { FEED_BASE, FEED_EVENT_ROUTE } from "./routes";
import axios from "axios";
import {
  setEventRecomendations,
  setFeed,
  setFeedEvents,
  setSelectedCity,
  setSelectedCountry,
} from "../redux/slices/appSlice";

export const getFeed = async ({
  dispatch,
  token,
  city,
  country,
}: {
  dispatch: Dispatch;
  token: string | null;
  city?: string;
  country?: string;
}) => {
  const headrs = headers(token);

  let cityQ = "";

  if (city) {
    cityQ = city;
  } else {
    const lastCitySearch = await getItemFromStore("last_city_search");

    if (lastCitySearch) {
      const { city } = JSON.parse(lastCitySearch);

      cityQ = city;
    }
  }

  let countryQ = "";

  if (country) {
    countryQ = country;
  } else {
    const lastCountrySearch = await getItemFromStore("last_country_search");

    if (lastCountrySearch) {
      const { country } = JSON.parse(lastCountrySearch);

      countryQ = country;
    }
  }

  const route = new URL(FEED_BASE);

  if (cityQ) {
    route.searchParams.append("city", cityQ);
  }

  if (countryQ) {
    route.searchParams.append("country", countryQ);
  }

  await axios
    .get(route.href, headrs)
    .then(async (res) => {
      const { feed, city, country } = res.data;

      if (city) {
        dispatch(setSelectedCity(city));
      }

      if (country) {
        dispatch(setSelectedCountry(country));
      }

      dispatch(setFeed(feed));
      dispatch(clearNotification());

      await saveItem("last_country_search", { country: countryQ });
      await saveItem("last_city_search", { city: cityQ });
    })
    .catch((err) => {
      console.log(err.response.data.err);
    });
};

export const getFeedEvents = async ({
  dispatch,
  token,
  city,
  country,
}: {
  dispatch: Dispatch;
  token: string | null;
  city?: string;
  country?: string;
}) => {
  const headrs = headers(token);

  let cityQ = "";

  if (city) {
    cityQ = city;
  } else {
    const lastCitySearch = await getItemFromStore("last_city_search");

    if (lastCitySearch) {
      const { city } = JSON.parse(lastCitySearch);

      cityQ = city;
    }
  }

  let countryQ = "";

  if (country) {
    countryQ = country;
  } else {
    const lastCountrySearch = await getItemFromStore("last_country_search");

    if (lastCountrySearch) {
      const { country } = JSON.parse(lastCountrySearch);

      countryQ = country;
    }
  }

  const route = new URL(FEED_EVENT_ROUTE);

  if (cityQ) {
    route.searchParams.append("city", cityQ);
  }

  if (countryQ) {
    route.searchParams.append("country", countryQ);
  }

  await axios
    .get(route.href, headrs)
    .then(async (res) => {
      const { feed, city, country } = res.data;

      if (city) {
        dispatch(setSelectedCity(city));
      }

      if (country) {
        dispatch(setSelectedCountry(country));
      }

      dispatch(setFeedEvents(feed));
      dispatch(clearNotification());

      await saveItem("last_country_search", { country: countryQ });
      await saveItem("last_city_search", { city: cityQ });
    })
    .catch((err) => {
      console.log(err.response.data.err);
    });
};

export const getRecomendations = async ({
  dispatch,
  token,
  id,
}: {
  dispatch: Dispatch;
  token: string | null;
  id: string | null | undefined;
}) => {
  const headrs = headers(token);

  await axios
    .get(`${FEED_BASE}/${id}`, headrs)
    .then(async (res) => {
      const { feed } = res.data;

      dispatch(setEventRecomendations(feed));
      dispatch(clearNotification());
    })
    .catch((err) => {
      console.log(err.response.data.err);
    });
};
