import Image from "next/image";
import React from "react";
import { ExEvent } from "../../interfaces/backendTypes";
import { formatXDate } from "../../utils/formatDate";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const EventPageContainer: React.FC<ExEvent> = ({
  title,
  cover,
  start_date,
  end_date,
  info,
  end_time,
  start_time,
  ticket_url,
  website_urls,
  location: { location, city, address, lat, lng },
}) => {
  return (
    <section className="w-full min-h-full py-20 pt-12 sm:pt-24 flex flex-col items-center justify-start">
      <div className="bg-gradient-to-b from-accent-200 to-primary-100 w-full h-[300px] absolute top-0 left-0" />

      <div className="w-full flex flex-col items-center justify-start max-w-[1200px] overflow-hidden z-10">
        <div className="w-full flex flex-col md:flex-row items-center md:items-end gap-2 min-h-[260px]">
          {cover && cover.src ? (
            <Image
              src={cover.src}
              alt={
                cover.alt
                  ? `${cover.alt} in www.spotloc.lv`
                  : `${title} in www.spotloc.lv`
              }
              width={500}
              height={500}
              draggable={false}
              className="rounded-md w-full max-w-[500px] md:w-[260px] lg:w-[450px] object-cover"
            />
          ) : null}

          <div className="flex flex-col flex-1 items-start justify-start w-full md:w-auto">
            <h1 className="text-2xl lg:text-4xl mb-2 text-primary-800">
              {title}
            </h1>

            <ul className="flex flex-col w-full gap-1">
              <li className="flex items-center justify-start text-xl lg:text-2xl">
                <CalendarDaysIcon className="text-accent h-6 mr-1" />

                {start_date ? (
                  end_date &&
                  formatXDate(end_date) !== formatXDate(start_date) ? (
                    <strong className="text-accent">
                      {formatXDate(start_date)} - {formatXDate(end_date)}
                    </strong>
                  ) : (
                    <strong className="text-accent">
                      {formatXDate(start_date)}
                    </strong>
                  )
                ) : null}
              </li>

              {start_time && (
                <li className="flex items-center justify-start">
                  <ClockIcon className="text-gray-500 h-6 mr-1" />

                  {start_time ? (
                    end_time && end_time !== start_time ? (
                      <p className="text-gray-500 flex-1 lg:text-2xl">
                        {start_time} - {end_time}
                      </p>
                    ) : (
                      <p className="text-gray-500 flex-1 lg:text-2xl">
                        {start_time}
                      </p>
                    )
                  ) : null}
                </li>
              )}

              {location || city || address ? (
                <li className="flex items-center justify-start">
                  <MapPinIcon className="text-gray-500 h-6 mr-1" />
                  {lat && lng ? (
                    <Link
                      href={`http://www.google.com/maps/place/${lat},${lng}`}
                      target="_blank"
                      className="text-gray-500 group flex-1"
                    >
                      <p className="group-hover:underline">
                        {location && (
                          <span className="font-semibold">{location}</span>
                        )}
                        {address && `, ${address}`}
                        {city && `, ${city}`}
                      </p>
                    </Link>
                  ) : (
                    <p className="text-gray-500 flex-1">
                      {location && (
                        <span className="font-semibold">{location}</span>
                      )}
                      {address && `, ${address}`}
                      {city && `, ${city}`}
                    </p>
                  )}
                </li>
              ) : null}
            </ul>

            {ticket_url && (
              <Link
                href={ticket_url}
                target="_blank"
                className="form_button rounded-md mt-4"
              >
                Biļetes
              </Link>
            )}
          </div>
        </div>

        <div className="w-full mt-4 bg-primary-100 rounded-lg p-1 sm:p-2 md:p-4 border">
          {info.map((par, i) => (
            <p key={i} className="sm:text-lg md:text-xl text-gray-500 mb-2">
              {par}
            </p>
          ))}

          <div className="flex flex-col mt-8">
            <strong>Vairāk informācijas:</strong>
            <ul className="flex flex-col">
              {website_urls.map((url, i) => (
                <Link
                  href={url}
                  target="_blank"
                  key={i}
                  className="text-accent"
                >
                  {url}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventPageContainer;
