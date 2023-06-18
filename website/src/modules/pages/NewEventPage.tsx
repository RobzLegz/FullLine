import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewEventContainer from "../../components/partner/event/NewEventContainer";
import ProfileHeader from "../../components/partner/profile/ProfileHeader";
import {
  AppInfo,
  selectApp,
  setCurrentEvent,
} from "../../redux/slices/appSlice";
import { getCategories } from "../../requests/categoryRequests";
import PartnerPageModule from "../PartnerPageModule";
import { getCountries } from "../../requests/countryRequests";
import { getCities } from "../../requests/cityRequests";
import { getPartnerSpots } from "../../requests/partnerRequests";

const NewEventPage = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const categoriesFetchedRef = useRef(false);
  const countriesFetchedRef = useRef(false);
  const citiesFetchedRef = useRef(false);
  const spotsFetchedRef = useRef(false);

  useEffect(() => {
    dispatch(setCurrentEvent(null));

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

  return (
    <PartnerPageModule
      title="Partnera profils | Jauns pasākums"
      description="Ievieto un atjauno informāciju par saviem pasākumiem."
    >
      <ProfileHeader />

      <NewEventContainer />
    </PartnerPageModule>
  );
};

export default NewEventPage;
