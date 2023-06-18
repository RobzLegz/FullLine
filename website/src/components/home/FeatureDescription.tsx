import React from "react";
import Link from "next/link";
import Image from "next/image";

const FeatureDescription = () => {
  return (
    <section className="w-full flex items-center justify-center flex-col-reverse md:flex-row gap-8 mb-10 md:mb-20">
      <Image
        src="/images/spotloc-dark-home.png"
        alt="Spotloc app dark theme"
        draggable={false}
        height={1000}
        width={400}
        className="w-40 sm:w-60"
      />

      <div className="flex flex-col items-start justify-center md:justify-start md:max-w-[500px]">
        <h3 className="text-primary-800 text-center md:text-left w-full">
          <span className="text-accent">Spotloc</span> mobilā aplikācija
        </h3>
        <p className="text-lg text-gray-500 mt-2 text-center md:text-left w-full">
          Izklaides visās Latvijas pilsētās visām interesemēm
        </p>
        <p className="text-gray-500 text-lg text-center md:text-left w-full">
          Atrodi pasākumus sev ērtā veidā!
        </p>
        <div className="hidden md:flex gap-2 mt-4 items-center justify-start w-full">
          <Link
            href="https://play.google.com/store/apps/details?id=com.spotloc.app"
            target="_blank"
            title="Spotloc Android"
          >
            <Image
              src="/icons/google-play-badge.png"
              alt="Get spotloc on Google Play"
              height={50}
              width={160}
              className="object-cover"
              draggable={false}
            />
          </Link>

          <Link
            href="https://apps.apple.com/lv/app/spotloc-events/id6445900535"
            target="_blank"
            title="Spotloc IOS"
          >
            <Image
              src="/icons/app-store-badge.svg"
              alt="Get spotloc on Google Play"
              height={50}
              width={145}
              className="object-cover"
              draggable={false}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureDescription;
