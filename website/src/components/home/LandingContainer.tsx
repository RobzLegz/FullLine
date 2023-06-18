import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingContainer = () => {
  return (
    <section className="bg-primary-100 relative h-full w-full flex flex-col items-center justify-start pt-20 overflow-hidden">
      <h1 className="text-primary-900 text-center">
        Visi Latvijas pasākumi vienā aplikācijā
      </h1>

      <Image
        src="/images/spotloc-design.png"
        alt="Spotloc app design"
        width={400}
        height={450}
        className="mt-8"
        draggable={false}
        blurDataURL="/images/spotloc-design.png"
        placeholder="blur"
      />

      <div className="flex gap-2 mt-8 items-center justify-center">
        <Link
          href="https://play.google.com/store/apps/details?id=com.spotloc.app"
          target="_blank"
          title="Spotloc Android"
        >
          <Image
            src="/icons/google-play-badge.png"
            alt="Get spotloc on Google Play"
            height={50}
            width={200}
            className="object-cover"
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
            width={180}
            className="object-cover"
            draggable={false}
          />
        </Link>
      </div>
    </section>
  );
};

export default LandingContainer;
