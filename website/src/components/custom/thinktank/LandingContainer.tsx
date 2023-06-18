import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingContainer = () => {
  return (
    <section className="w-screen flex items-start justify-start overflow-hidden relative text-white min-h-[1600px]">
      <Image
        src="/thinktank/synthvawe-doge-hero.png"
        alt="ThinkTank 2023 synthvawe doge"
        width={700}
        height={700}
        className="w-full h-full object-cover absolute top-0 left-0"
        draggable={false}
        blurDataURL="/thinktank/synthvawe-doge-hero.png"
        placeholder="blur"
      />

      <div className="w-full h-[1600px] bg-gradient-to-b from-transparent to-thinktank-bg flex flex-col z-10">
        <div className="w-full max-w-[800px] lg:w-[800px] lg:max-w-none 2xl:w-[1000px] p-2 sm:p-4 lg:p-16 flex flex-col items-start justify-between h-full pb-60">
          <div className="flex flex-col">
            <Image
              src="/thinktank/logo.svg"
              alt="ThinkTank 2023 synthvawe doge"
              width={100}
              height={100}
              className="w-16 xl:w-20 2xl:w-24 object-cover"
              draggable={false}
            />

            <h1 className="mt-12 2xl:mt-16 tracking-[7.5px] text-[40px] lg:text-[80px] font-bolder mb-2 xl:mb-0 2xl:mb-4">
              ThinkTank 2023
            </h1>
            <strong className="tracking-[5px] text-[28px] lg:text-[40px] font-bold text-thinktank-accent">
              Attīsti | Radi | Izpēti
            </strong>

            <div className="p-2  rounded-lg bg-thinktank-bg mt-4 2xl:mt-6 opacity-80">
              <p className="text-white text-[20px] font-semibold tracking-[1.5px]">
                Vēlies būt daļa no kaut kā, kas ir revolucionārs un ļaus Tev
                radoši attīstīt idejas? Vai Tu vari 48 stundās izveidot pilnīgi
                jaunu ideju un prezentēt to žūrijas panelim? Pierādi sevi sevi
                un piesakies ThinkTank 2023.
              </p>
            </div>

            <Link href="/thinktank/register">
              <div className="mt-6 2xl:mt-8 bg-thinktank-button opacity-75 w-44 md:w-80 2xl:w-[340px] h-12 2xl:h-[60px] text-[20px] md:text-[32px] font-semibold tracking-[3px] rounded-lg hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
                Reģistrējies
              </div>
            </Link>
          </div>

          <div className="w-full flex items-start justify-start gap-8 md:gap-20">
            <div className="flex flex-col">
              <strong className="text-[32px] sm:text-[40px] text-thinktank-accent font-medium tracking-[3px]">
                Kad?
              </strong>

              <strong className="text-[20px] sm:text-[32px] text-white font-semibold tracking-[3px]">
                20. - 22. oktobris 2023
              </strong>
            </div>

            <div className="flex flex-col">
              <strong className="text-[32px] sm:text-[40px] text-thinktank-accent font-medium tracking-[3px]">
                Kur?
              </strong>

              <Link
                href="https://goo.gl/maps/pob5MC2sVG86bq6d6"
                target="_blank"
                rel="noreferrer"
              >
                <strong className="text-[20px] sm:text-[32px] text-white font-semibold tracking-[3px]">
                  Rīgas Teikas Vidusskola
                </strong>
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <strong className="text-[32px] sm:text-[40px] text-thinktank-accent font-medium tracking-[3px]">
              Organizers
            </strong>

            <div className="flex mt-2 xl:mt-6 gap-8">
              <Image
                src="/thinktank/rigas-teikas-vidusskolas-logo.png"
                alt="Rīgas Teikas Vidusskolas logo"
                width={200}
                height={200}
                className="w-16 sm:w-20 xl:w-24 rounded-full"
                draggable={false}
              />

              <Image
                src="/thinktank/junior-achievement-alumni-logo.png"
                alt="Rīgas Teikas Vidusskolas logo"
                width={200}
                height={200}
                className="w-16 sm:w-20 xl:w-24 rounded-full"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingContainer;
