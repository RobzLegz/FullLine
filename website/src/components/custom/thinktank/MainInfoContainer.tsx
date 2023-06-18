import Link from "next/link";
import React from "react";

const MainInfoContainer = () => {
  return (
    <section className="w-full max-w-[1200px] flex flex-col p-4 sm:p-8 rounded-lg border-2 my-20 border-thinktank-accent border-dashed text-white gap-8">
      <div className="flex flex-col gap-4">
        <strong className="text-[32px] sm:text-[40px] text-thinktank-accent font-medium tracking-[3px]">
          ThinkTank
        </strong>

        <p className="text-thinktank-text text-[20px] font-semibold tracking-[1.5px]">
          ThinkTank 2024 ir biznesa ideju hakatons, ko rīko Junior Achievement
          Alumni Latvia kopā ar Teikas vidusskolu. Pasākums notiks trīs dienas,
          sākot 9. jūnija, piektdienas vakarā un beidzot 11. jūnija pašā vakarā.
        </p>

        <p className="text-thinktank-text text-[20px] font-semibold tracking-[1.5px]">
          Pasākuma ietvaros notiks lekcijas, kurās visi dalībnieki iemācīsies
          veidot un attīstīt savas idejas. Dalībnieki divas dienās izstrādās
          savu biznesa ideju vienā no četrām sfērām - tehnoloģiju ideja, sociālā
          uzņēmejdarbība, veselību vai izglītojošo tehnoloģiju ideja, videi
          draudzīgs uzņēmums. Svētdien pa dienu tie prezentēs savu veikumu
          priekšā sadarbības partneru žūrijai, kas novērtēs ideju un izvirzīs
          pirmās trīs vietas, kā arī piešķirs nominācijas balvas.
        </p>

        <p className="text-thinktank-text text-[20px] font-semibold tracking-[1.5px]">
          Pēdējās dienas vakarā notiks apbalvošana, kur sadarbības partneri
          piešķirs savas balvas un pasniegs titulu “Biznesa ideju hakatona Guru
          2023”.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <strong className="text-[32px] sm:text-[40px] text-thinktank-accent font-medium tracking-[3px]">
          Mērķis
        </strong>

        <p className="text-thinktank-text text-[20px] font-semibold tracking-[1.5px]">
          Hakatona mērķis ir raisīt jauniešu izglītošanu par uzņēmejdarbību un
          tehnoloģiju iesaisti uzņēmejdarbībā, dot finansējumu labākām komandām,
          lai uzlabotu uzņēmejdarbību Latvijā un radīt pozitīvu atmosfēru
          jauniešiem, kur iepazīt cilvēkus, lai tālāk varētu veidot jaunas
          idejas un meklēt iespējas pašattīstīties.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <strong className="text-[32px] sm:text-[40px] text-thinktank-accent font-medium tracking-[3px]">
          Dalībnieki
        </strong>

        <p className="text-thinktank-text text-[20px] font-semibold tracking-[1.5px]">
          Kopējais skaits: 60 cilvēki, jeb 15 komandas.
        </p>

        <Link href="/thinktank/register">
          <div className="mt-2 bg-thinktank-button opacity-75 w-44 md:w-80  h-12 text-[24px] font-semibold tracking-[3px] rounded-lg hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
            Reģistrējies
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MainInfoContainer;
