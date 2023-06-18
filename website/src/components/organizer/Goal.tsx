import Image from "next/image";
import React from "react";

const Goal = () => {
  return (
    <section className="w-full h-40 relative my-8 rounded-full overflow-hidden">
      <Image
        src="/images/event-beam.jpg"
        alt="Lazer beams on a concert stage"
        width={1200}
        height={160}
        loading="lazy"
        className="w-full h-full object-cover"
      />

      <div className="flex w-full h-full items-center justify-center absolute top-0 left-0  bg-transparent-500 px-6 md:px-20">
        <strong className="text-xl md:text-2xl text-primary-100 text-center">
          Mūsu mērķis ir padarīt informāciju par pasākumiem ātri un ērti
          pieejamu visiem.
        </strong>
      </div>
    </section>
  );
};

export default Goal;
