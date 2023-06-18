import Image from "next/image";
import React from "react";

const TasksContainer = () => {
  return (
    <section className="w-full py-20 flex flex-col items-center justify-start">
      <strong className="text-primary-100 text-4xl">Uzdevumi</strong>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-4 mt-12">
        <div className="w-full h-full p-4 md:p-6 flex items-start justify-start flex-col bg-gradient-to-br from-secondary-900 to-accent-200 rounded-lg">
          <Image
            src="/ilustrations/solutions.svg"
            width={500}
            height={500}
            alt="Thinking of solutions for a coding problem"
            className="h-40"
            draggable={false}
          />

          <strong className="text-primary-100 mt-4 text-lg">
            Atrisināt dažādas programmēšanas problēmas ar algoritmu palīdzību
          </strong>

          <p className="text-gray-200 mt-2">
            Algoritma rakstīšanai var izmantot jebkādu programmēšanas valodu
          </p>
        </div>

        <div className="w-full h-full p-4 md:p-6 flex items-start justify-start flex-col bg-gradient-to-br from-secondary-900 to-accent-200 rounded-lg">
          <Image
            src="/ilustrations/pair.svg"
            width={500}
            height={500}
            alt="Two people thinking of solutions for a coding problem"
            className="h-40"
            draggable={false}
          />

          <strong className="text-primary-100 mt-4 text-lg">
            Radoši organizēt komandas darbu, lai uzdevumu paveiktu pēc iespējas
            efektīvāk
          </strong>

          <p className="text-gray-200 mt-2">
            Komandas sastāvēs no 4 dalībniekiem
          </p>
        </div>
      </div>
    </section>
  );
};

export default TasksContainer;
