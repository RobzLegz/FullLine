import Image from "next/image";
import React from "react";

const HowWeDoIt = () => {
  return (
    <section className="mb-16 w-full mt-8 flex flex-col gap-4">
      <div className="w-full flex items-center justify-center gap-2 md:gap-4">
        <Image
          src="/images/spotloc-feed.png"
          alt="Spotloc event feed"
          width={300}
          height={600}
          draggable="false"
          className="w-40 sm:w-48 md:w-60"
        />

        <div className="w-96 flex flex-col">
          <strong className="text-2xl sm:text-3xl md:text-4xl text-primary-900">
            Pasākumu afiša
          </strong>

          <p className="text-lg sm:text-xl text-primary-800 mt-1 sm:mt-2">
            Aplikācijā pieejama pasākumu afiša, lai apmeklētāji Jūsu pasākumu
            atrastu pēc iespējas ātrāk un ērtāk.
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-2 md:gap-4">
        <div className="w-96 flex flex-col">
          <strong className="text-2xl sm:text-3xl md:text-4xl text-primary-900">
            Pasākumu karte
          </strong>

          <p className="text-lg sm:text-xl text-primary-800 mt-1 sm:mt-2">
            Aplikācijā pieejama pasākumu karte, lai apmeklētāji varētu atrast
            viņiem tuvākos pasākumus.
          </p>
        </div>

        <Image
          src="/images/spotloc-map.png"
          alt="Spotloc event map functionality"
          width={300}
          height={600}
          draggable="false"
          className="w-40 sm:w-48 md:w-60"
        />
      </div>

      <div className="w-full flex items-center justify-center gap-2 md:gap-4">
        <Image
          src="/images/spotloc-search.png"
          alt="Spotloc app search functionality"
          width={300}
          height={600}
          draggable="false"
          className="w-40 sm:w-48 md:w-60"
        />

        <div className="w-96 flex flex-col">
          <strong className="text-2xl sm:text-3xl md:text-4xl text-primary-900">
            Pasākumu meklēšana
          </strong>

          <p className="text-lg sm:text-xl text-primary-800 mt-1 sm:mt-2">
            Aplikācijā iespējama pasākumu meklēšana, lai Jūsu pasākumu varētu
            atrast pēc nosaukuma, norises vietas, kategorijas un datuma.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWeDoIt;
