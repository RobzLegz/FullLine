import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingContainer = () => {
  return (
    <section className="w-full h-screen flex items-start justify-start overflow-hidden p-4 md:p-0">
      <div className="absolute top-0 left-0 h-screen w-full bg-gradient-to-r from-accent-100 via-secondary-900 to-secondary-900 flex items-start justify-end overflow-hidden">
        <Image
          src="/images/spotloc-xtreme-programmesenas-maratons.png"
          alt="Spotloc extreme marathon face"
          width={2000}
          height={2000}
          className="w-[800px] h-full object-cover"
          draggable={false}
          blurDataURL="/images/spotloc-xtreme-programmesenas-maratons.png"
          placeholder="blur"
        />
      </div>

      <div className="flex z-10 w-full max-w-[1200px] justify-start items-center h-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 md:bg-clip-border md:backdrop-filter-none md:backdrop-blur-none md:bg-opacity-0 rounded-lg md:rounded-none p-4">
        <div className="flex flex-col items-start justify-start max-w-[600px]">
          <h1 className="text-primary-100 text-left leading-[40px] md:leading-[70px]">
            Xtreme Programmēšanas Maratons 2023
          </h1>

          <p className="text-lg md:text-2xl mt-4 text-gray-300 font-thin">
            29. Maijā
          </p>

          <p className="md:text-2xl mt-4 text-gray-300 font-thin">
            Rīgas Tehniskās koledžas telpās
          </p>

          <small className="mt-2 text-accent md:text-lg">
            Braslas iela 16, Riga
          </small>

          <Link
            href="/maratons/register"
            className="bg-accent border border-white flex items-center justify-center px-6 md:px-12 py-1 md:py-3 rounded-md text-xl text-white mt-8 shadow-2xl shadow-accent"
          >
            Reģistrējies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingContainer;
