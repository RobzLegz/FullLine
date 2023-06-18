import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewSpotContainer from "../../components/partner/spot/NewSpotContainer";
import ProfileHeader from "../../components/partner/profile/ProfileHeader";
import {
  AppInfo,
  selectApp,
  setCurrentSpot,
} from "../../redux/slices/appSlice";
import { getCategories } from "../../requests/categoryRequests";
import PartnerPageModule from "../PartnerPageModule";
import { getCountries } from "../../requests/countryRequests";
import { getCities } from "../../requests/cityRequests";

const NewSpotPage = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const categoriesFetchedRef = useRef(false);
  const countriesFetchedRef = useRef(false);
  const citiesFetchedRef = useRef(false);

  useEffect(() => {
    dispatch(setCurrentSpot(null));

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

  return (
    <PartnerPageModule
      title="Partnera profils | Jauna vieta"
      description="Ievieto un atjauno informāciju par savām vietām un produktiem."
    >
      <ProfileHeader />

      <NewSpotContainer />
    </PartnerPageModule>
  );
};

export default NewSpotPage;
