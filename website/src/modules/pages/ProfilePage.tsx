import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../components/partner/profile/Profile";
import ProfileHeader from "../../components/partner/profile/ProfileHeader";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import {
  getPartnerChart,
  getPartnerEvents,
  getPartnerPopularEvents,
  getPartnerSpots,
} from "../../requests/partnerRequests";
import PartnerPageModule from "../PartnerPageModule";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const dataFetchedRef = useRef(false);
  const spotsFetchedRef = useRef(false);
  const popularFetchedRef = useRef(false);
  const eventsFetchedRef = useRef(false);

  useEffect(() => {
    if (!dataFetchedRef.current && !appInfo.viewChartData && appInfo.info) {
      dataFetchedRef.current = true;
      getPartnerChart({ dispatch, id: appInfo.info.id });
    }

    if (!appInfo.spots && !spotsFetchedRef.current) {
      spotsFetchedRef.current = true;
      getPartnerSpots({ dispatch });
    }

    if (!appInfo.events && !eventsFetchedRef.current) {
      eventsFetchedRef.current = true;
      getPartnerEvents({ dispatch, skip: 0 });
    }

    if (!appInfo.popularEvents && !popularFetchedRef.current && appInfo.info) {
      popularFetchedRef.current = true;
      getPartnerPopularEvents({ dispatch, id: appInfo.info.id });
    }
  }, [appInfo.info]);

  return (
    <PartnerPageModule
      title="Partnera profils"
      description="Ievieto un atjauno informāciju par saviem pasākumiem"
    >
      <ProfileHeader />

      <Profile />
    </PartnerPageModule>
  );
};

export default ProfilePage;
