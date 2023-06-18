import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExEvent } from "../../../interfaces/backendTypes";
import { AppInfo, selectApp } from "../../../redux/slices/appSlice";
import { deleteEvent } from "../../../requests/eventRequests";
import { ProfileInfoTab } from "./Profile";
import Button from "../../ui/Button";
import { getPartnerEvents } from "../../../requests/partnerRequests";

const MyEvents = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const [eventsLoading, setEventsLoading] = useState(false);

  const loadMore = () => {
    if (eventsLoading) {
      return;
    }

    setEventsLoading(true);

    getPartnerEvents({
      dispatch,
      skip: appInfo.events ? appInfo.events?.length : 0,
    });

    setEventsLoading(false);
  };

  const EventCard: React.FC<ExEvent> = ({ id, title, cover, info }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
      if (loading) {
        return;
      }

      setLoading(true);

      await deleteEvent({ id, dispatch });

      setLoading(false);
    };

    return (
      <li className="flex p-1 border rounded-md hover:bg-primary-300 group">
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt ? cover.alt : title}
            width={80}
            height={80}
            className="mr-2 w-16 h-16 rounded-md object-cover"
          />
        )}

        <div className="flex flex-col flex-1">
          <strong className="text-base">{title}</strong>

          {info.length > 0 && (
            <p className="text-gray-500 text-sm">
              {info[0].substring(0, 100)}...
            </p>
          )}

          <div className="w-full items-end justify-end hidden group-hover:flex gap-1">
            <Link
              href={`/profils/pasakums/${id}`}
              className="bg-accent-100 p-1 rounded-md"
            >
              <PencilIcon className="text-white w-6" />
            </Link>

            <Button
              className="bg-accent p-1 rounded-md"
              onClick={handleDelete}
              disabled={loading}
              loading={loading}
              icon={<TrashIcon className="text-white w-6" />}
            />
          </div>
        </div>
      </li>
    );
  };

  return (
    <ProfileInfoTab
      title={<strong>Mani pasākumi</strong>}
      className="md:col-span-2"
      noData={!appInfo.events || appInfo.events.length === 0}
    >
      <ul className="flex flex-col w-full md:max-h-[400px] md:overflow-y-auto gap-1">
        {appInfo.events &&
          appInfo.events.map((event) => (
            <EventCard {...event} key={event.id} />
          ))}
        {appInfo.events && appInfo.events.length > 0 ? (
          <li className="flex w-full items-center justify-center mt-2">
            <Button
              onClick={loadMore}
              loading={eventsLoading}
              className="w-40 rounded-md"
            >
              Ielādēt vēl
            </Button>
          </li>
        ) : null}
      </ul>
    </ProfileInfoTab>
  );
};

export default MyEvents;
