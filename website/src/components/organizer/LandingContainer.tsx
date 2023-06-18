import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingContainer = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-20 pb-8 px-2">
      <h1 className="mb-8 text-center max-w-[700px] xl:leading-[60px]">
        Sasniedz plašāku mērķauditoriju savam pasākumam!
      </h1>

      <Image
        src="/images/organizer-hero.png"
        width={1200}
        height={500}
        alt="Organizer panel with events flying out from it"
        className="w-full max-w-[700px]"
        draggable={false}
        blurDataURL="/images/organizer-hero.png"
        placeholder="blur"
      />

      <p className="text-lg mt-8 text-gray-500 text-center">
        Kļūsti par spotloc organizatoru un sasniedz atbilstošāko mērķauditoriju
        savam pasākumam!
      </p>

      <Link
        href="/auth/register"
        className="form_button rounded-md h-12 w-60 mt-4"
      >
        Pievienoties
      </Link>
    </section>
  );
};

export default LandingContainer;
