import Image from "next/image";
import React from "react";

const GoalsContainer = () => {
  return (
    <section className="w-full py-20 flex flex-col items-center justify-start">
      <strong className="text-primary-100 text-4xl">Mērķi</strong>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-4 mt-12">
        <div className="w-full h-full p-4 md:p-6 flex items-start justify-start flex-col bg-gradient-to-br from-secondary-900 to-accent-200 rounded-lg">
          <Image
            src="/ilustrations/extreme-programming.svg"
            width={500}
            height={500}
            alt="Extreme programming"
            className="h-40"
            draggable={false}
          />

          <strong className="text-primary-100 mt-4 text-lg">
            Iepazīstināt un popularizēt extrēmās programmēšanas pamatprincipus
          </strong>
        </div>

        <div className="w-full h-full p-4 md:p-6 flex items-start justify-start flex-col bg-gradient-to-br from-secondary-900 to-accent-200 rounded-lg">
          <Image
            src="/ilustrations/teamwork.svg"
            width={500}
            height={500}
            alt="Two people thinking of solutions for a coding problem"
            className="h-40"
            draggable={false}
          />

          <strong className="text-primary-100 mt-4 text-lg">
            Gūt pieredzi strādājot komandā pie problēmu risināšanas
          </strong>
        </div>

        <div className="w-full h-full p-4 md:p-6 flex items-start justify-start flex-col bg-gradient-to-br from-secondary-900 to-accent-200 rounded-lg">
          <Image
            src="/ilustrations/technology.svg"
            width={500}
            height={500}
            alt="Girl thinking about technology"
            className="h-40"
            draggable={false}
          />

          <strong className="text-primary-100 mt-4 text-lg">
            Iepazīstināt ar mūsdienu un nākotnes tehnoloģijā, kā arī to
            pielietojumu
          </strong>
        </div>
      </div>
    </section>
  );
};

export default GoalsContainer;
