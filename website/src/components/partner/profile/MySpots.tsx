import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExSpot } from "../../../interfaces/backendTypes";
import { AppInfo, selectApp } from "../../../redux/slices/appSlice";
import { ProfileInfoTab } from "./Profile";
import { deleteSpot } from "../../../requests/spotRequests";
import Button from "../../ui/Button";

const MySpots = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const SpotCard: React.FC<ExSpot> = ({ id, name, cover, description }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
      if (loading) {
        return;
      }

      setLoading(true);

      await deleteSpot({ id, dispatch });

      setLoading(false);
    };

    return (
      <li className="flex p-1 border rounded-md hover:bg-primary-300 group">
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt ? cover.alt : name}
            width={80}
            height={80}
            className="mr-2 w-16 h-16 rounded-md object-cover"
          />
        )}

        <div className="flex flex-col flex-1">
          <strong className="text-base">{name}</strong>

          <p className="text-gray-500 text-sm">
            {description?.substring(0, 80)}...
          </p>

          <div className="w-full items-end justify-end hidden group-hover:flex gap-1">
            <Link
              href={`/profils/vieta/${id}`}
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
      title={<strong>Manas lokācijas</strong>}
      className="md:col-span-1"
      noData={!appInfo.spots || appInfo.spots.length === 0}
    >
      <ul className="flex flex-col w-full md:max-h-[400px] md:overflow-y-auto gap-1">
        {appInfo.spots &&
          appInfo.spots.map((event) => <SpotCard {...event} key={event.id} />)}
      </ul>
    </ProfileInfoTab>
  );
};

export default MySpots;
