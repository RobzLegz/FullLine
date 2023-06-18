import Image from "next/image";
import Link from "next/link";
import React from "react";

const PoweredBySpotloc = () => {
  return (
    <section className="w-full my-20 text-white flex items-center justify-start gap-2 mt-40 opacity-70">
      <p className="text-xl ">Powered by</p>

      <Link href="/">
        <Image
          src="/icons/spotloc-logo-white.png"
          alt="Spotloc logo"
          width={70}
          height={10}
        />
      </Link>
    </section>
  );
};

export default PoweredBySpotloc;
