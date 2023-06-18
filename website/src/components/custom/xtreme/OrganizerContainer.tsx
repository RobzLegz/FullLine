import Image from "next/image";
import React from "react";

const OrganizerContainer = () => {
  return (
    <section className="w-full py-20 flex flex-col items-center justify-start">
      <strong className="text-primary-100 text-4xl">Organizē</strong>

      <div className="grid gap-4 md:gap-0 md:grid-cols-2 place-content-center place-items-center mt-12">
        <Image
          src="/icons/rtk-logo.png"
          width={300}
          height={300}
          alt="Rtk logo as Spotloc xtreme marathon organizer"
          className="h-24 w-auto"
        />

        <Image
          src="/icons/spotloc-logo-theme.svg"
          width={300}
          height={300}
          alt="Rtk logo as Spotloc xtreme marathon organizer"
          className="h-16 w-auto"
        />
      </div>
    </section>
  );
};

export default OrganizerContainer;
