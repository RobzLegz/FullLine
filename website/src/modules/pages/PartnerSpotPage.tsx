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
import { getSpotById } from "../../requests/spotRequests";
import NewSpotContainer from "../../components/partner/spot/NewSpotContainer";

const PartnerSpotPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const appInfo: AppInfo = useSelector(selectApp);

  const spotFetchedRef = useRef(false);

  const categoriesFetchedRef = useRef(false);
  const countriesFetchedRef = useRef(false);
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
  }, [appInfo.info]);

  useEffect(() => {
    if (typeof router.query.id !== "string" || spotFetchedRef.current) {
      return;
    }

    spotFetchedRef.current = true;

    getSpotById({
      dispatch,
      id: router.query.id,
    });
  }, [router.query.id]);

  return (
    <PartnerPageModule
      title="Mana lokācija"
      description="Atjauno informāciju par savu pasākumu"
    >
      <ProfileHeader />

      <NewSpotContainer />
    </PartnerPageModule>
  );
};

export default PartnerSpotPage;
