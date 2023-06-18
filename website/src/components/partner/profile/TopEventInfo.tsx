import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { ExEvent } from "../../../interfaces/backendTypes";
import { AppInfo, selectApp } from "../../../redux/slices/appSlice";
import { ProfileInfoTab } from "./Profile";

const TopEventInfo = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  const EventCard: React.FC<ExEvent> = ({ title, cover, view_count }) => {
    return (
      <li className="w-full p-1 flex items-start justify-start gap-2 border rounded-md">
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt ? cover?.alt : title}
            width={100}
            height={100}
            className="w-12 h-12 rounded-md"
          />
        )}

        <div className="flex flex-col items-start justify-start">
          <strong className="text-sm">
            {title.length > 35 ? `${title.substring(0, 35)}...` : title}
          </strong>

          <div className="flex gap-2">
            <small className="text-gray-500 text-xs">
              {view_count ? view_count : 0} skatījumi
            </small>
          </div>
        </div>
      </li>
    );
  };

  return (
    <ProfileInfoTab
      noData={!appInfo.popularEvents || appInfo.popularEvents.length === 0}
      title={<strong>Populārākie pasākumi</strong>}
    >
      <ul className="flex flex-col items-start justify-start h-full overflow-y-auto gap-2 max-h-[400px]">
        {appInfo.popularEvents?.map((event) => (
          <EventCard {...event} key={event.id} />
        ))}
      </ul>
    </ProfileInfoTab>
  );
};

export default TopEventInfo;
