import Link from "next/link";
import React from "react";

const Participants = () => {
  return (
    <section className="w-full py-20 flex flex-col items-center justify-start">
      <strong className="text-primary-100 text-4xl">Dalībnieki</strong>

      <ul className="list-disc list-inside flex flex-col gap-4 text-2xl text-white mt-12">
        <li>10 - 12 klašu skolēni</li>
        <li>1 - 4 kursu studenti</li>
      </ul>

      <Link
        href="/maratons/register"
        className="bg-accent border border-white flex items-center justify-center px-12 py-2 rounded-md text-xl text-white mt-8 shadow-2xl shadow-accent"
      >
        Pieteikties
      </Link>
    </section>
  );
};

export default Participants;
