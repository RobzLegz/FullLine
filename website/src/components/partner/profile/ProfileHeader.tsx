import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../../redux/slices/appSlice";
import Header from "../Header";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { setNotification } from "../../../redux/slices/notificationSlice";

const ProfileHeader = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  if (!appInfo.info) {
    return null;
  }

  return (
    <Header>
      <div className="relative flex items-end justify-start">
        {appInfo.info.logo && (
          <Image
            src={appInfo.info.logo}
            alt="Organizer logo"
            width={35}
            height={35}
            className="rounded-lg mr-2 object-cover w-12 h-12"
            draggable={false}
          />
        )}

        <div className="flex">
          <strong className="relative">{appInfo.info.name}</strong>
          {appInfo.info.verified && (
            <span className="flex items-start justify-center h-full">
              <CheckBadgeIcon className="text-accent w-5" />
            </span>
          )}
        </div>

        <button
          className="m-1"
          onClick={() => dispatch(setNotification({ type: "edit_profile" }))}
        >
          <PencilSquareIcon className="text-primary-800 w-6" />
        </button>
      </div>
    </Header>
  );
};

export default ProfileHeader;
