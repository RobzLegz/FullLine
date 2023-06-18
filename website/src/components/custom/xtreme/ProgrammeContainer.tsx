import Image from "next/image";
import React from "react";

const ProgrammeContainer = () => {
  return (
    <section className="w-full py-20 flex items-center justify-center">
      <Image
        src="/images/marathon-program.png"
        alt="Extreme marathon program"
        className="rounded-lg"
        draggable={false}
        width={500}
        height={1000}
      />
    </section>
  );
};

export default ProgrammeContainer;
