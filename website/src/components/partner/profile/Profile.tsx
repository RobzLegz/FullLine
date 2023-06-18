import React from "react";
import AudienceData from "./AudienceData";
import MonthlyData from "./MonthlyData";
import MyEvents from "./MyEvents";
import TicketData from "./TicketData";
import TopEventInfo from "./TopEventInfo";
import MySpots from "./MySpots";

interface ProfileTabProps {
  children?: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  noData?: boolean;
  commingSoon?: boolean;
}

export const ProfileInfoTab: React.FC<ProfileTabProps> = ({
  children,
  className,
  title,
  noData = true,
  commingSoon = false,
}) => {
  return (
    <div
      className={`flex flex-col text-lg gap-2 border border-gray-300 p-1 md:p-4 rounded-lg ${
        className ? className : ""
      }`}
    >
      {title}

      {commingSoon ? (
        <div className="w-full h-full flex items-center justify-center p-4">
          <p className="text-gray-500">Drīzumā</p>
        </div>
      ) : noData ? (
        <div className="w-full h-full flex items-center justify-center p-4">
          <p className="text-gray-500">Nav datu</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

const Profile = () => {
  return (
    <section className="w-full flex-col flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-16">
      <MonthlyData />

      <TopEventInfo />

      {/* <TicketData />

      <AudienceData /> */}

      <MySpots />

      <MyEvents />
    </section>
  );
};

export default Profile;
