import React from "react";

const PrizesContainer = () => {
  return (
    <section className="w-full flex flex-col my-20 items-center justify-center">
      <strong className="mt-12 2xl:mt-16 tracking-[7.5px] text-[40px] lg:text-[80px] font-bolder mb-4 text-thinktank-accent">
        Balvas
      </strong>

      <div className="grid items-center justify-center place-content-center place-items-center gap-2 sm:gap-8 grid-cols-3">
        <div className="w-full h-full p-4 rounded-lg border-2 border-thinktank-accent flex flex-col items-center justify-center text-white">
          <strong className="text-thinktank-accent mb-4 text-xl">
            1. vieta
          </strong>

          <strong className="text-4xl">1500€</strong>
        </div>
        <div className="w-full h-full p-4 rounded-lg border-2 border-thinktank-accent flex flex-col items-center justify-center text-white">
          <strong className="text-thinktank-accent mb-4 text-xl">
            2. vieta
          </strong>
          <strong className="text-3xl">800€</strong>
        </div>
        <div className="w-full h-full p-4 rounded-lg border-2 border-thinktank-accent flex flex-col items-center justify-center text-white">
          <strong className="text-thinktank-accent mb-4 text-xl">
            3. vieta
          </strong>
          <strong className="text-2xl">500€</strong>
        </div>
      </div>

      <strong className="mt-4 text-5xl text-thinktank-accent">+</strong>

      <strong className="text-white text-2xl">Partneru specbalvas</strong>
    </section>
  );
};

export default PrizesContainer;
