import Image from "next/image";
import React from "react";

const FeatureList = () => {
  return (
    <section className="w-full pt-20 pb-10 md:pb-20 flex flex-col items-center justify-start">
      <h2 className="text-primary-800 mb-4 md:mb-8 text-center">
        Vairāk nekā 9000 izklaides iespējas visās Latvijas pilsētās
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 w-full">
        <div className="w-full col-span-2 md:col-span-1 relative bg-gradient-to-tr from-primary-900 via-primary-900 to-accent flex flex-col items-center justify-end rounded-xl md:rounded-2xl p-2 md:p-6">
          <Image
            src="/images/search-events-on-spotloc.png"
            alt="Spotloc map features"
            className=""
            draggable={false}
            width={200}
            height={200}
          />

          <strong className="text-primary-100 font-normal md:font-semibold md:text-lg mt-4 text-center">
            Ātri atrodi Tev interesējošus pasākumus
          </strong>
        </div>

        <div className="w-full relative bg-gradient-to-b from-accent to-accent-100 flex flex-col items-center justify-end rounded-xl md:rounded-2xl p-2 md:p-6">
          <Image
            src="/images/spotloc-map-features.png"
            alt="Spotloc map features"
            className=""
            draggable={false}
            width={200}
            height={200}
          />

          <strong className="text-primary-100 font-normal md:font-semibold md:text-lg mt-4 text-center">
            Apskati pasākumus kartē!
          </strong>
        </div>

        <div className="w-full relative bg-gradient-to-b from-accent-200 to-accent-100 flex flex-col items-center justify-end rounded-xl md:rounded-2xl p-2 md:p-6">
          <Image
            src="/images/save-events-on-spotloc.png"
            alt="Spotloc map features"
            className=""
            draggable={false}
            width={160}
            height={200}
          />

          <strong className="text-primary-100 font-normal md:font-semibold md:text-lg mt-4 text-center">
            Saglabā Tev interesējošus pasākumus
          </strong>
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
