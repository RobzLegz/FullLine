import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewEventContainer from "../../components/partner/event/NewEventContainer";
import ProfileHeader from "../../components/partner/profile/ProfileHeader";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { getCategories } from "../../requests/categoryRequests";
import { getEventById } from "../../requests/eventRequests";
import PartnerPageModule from "../PartnerPageModule";
import { getCountries } from "../../requests/countryRequests";
import { getCities } from "../../requests/cityRequests";
import { getPartnerSpots } from "../../requests/partnerRequests";

const OrganizerEventPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const appInfo: AppInfo = useSelector(selectApp);

  const eventFetchedRef = useRef(false);

  const categoriesFetchedRef = useRef(false);
  const countriesFetchedRef = useRef(false);
  const spotsFetchedRef = useRef(false);
  const citiesFetchedRef = useRef(false);

  useEffect(() => {
    if (!appInfo.info) {
      return;
    }

    if (!appInfo.categories && !categoriesFetchedRef.current) {
      categoriesFetchedRef.current = true;

      getCategories({
        dispatch,
      });
    }

    if (!appInfo.countries && !countriesFetchedRef.current) {
      countriesFetchedRef.current = true;

      getCountries({
        dispatch,
      });
    }

    if (!appInfo.cities && !citiesFetchedRef.current) {
      citiesFetchedRef.current = true;

      getCities({
        dispatch,
      });
    }

    if (!appInfo.spots && !spotsFetchedRef.current) {
      spotsFetchedRef.current = true;

      getPartnerSpots({
        dispatch,
      });
    }
  }, [appInfo.info]);

  useEffect(() => {
    if (typeof router.query.id !== "string" || eventFetchedRef.current) {
      return;
    }

    eventFetchedRef.current = true;

    getEventById({
      dispatch,
      id: router.query.id,
    });
  }, [router.query.id]);

  return (
    <PartnerPageModule
      title="Mans pasākums"
      description="Atjauno informāciju par savu pasākumu pasākumiem"
    >
      <ProfileHeader />

      <NewEventContainer />
    </PartnerPageModule>
  );
};

export default OrganizerEventPage;
