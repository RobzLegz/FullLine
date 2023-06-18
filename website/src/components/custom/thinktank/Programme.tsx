import React from "react";

interface PlanProps {
  date: string;
  day: string;
  dule: {
    time: string;
    activity: string;
  }[];
}

const Plan: React.FC<PlanProps> = ({ date, day, dule }) => {
  return (
    <div className="flex flex-col relative h-full">
      <strong className="text-thinktank-accent text-xl">{date}</strong>
      <strong className="text-white text-2xl md:text-5xl mb-4">{day}</strong>

      {dule.map((item, i) => (
        <div className="flex items-start justify-start gap-8 relative" key={i}>
          <div className="h-full absolute">
            <div className="w-[1px] h-full bg-thinktank-text"></div>
          </div>
          <div className="flex-col ml-8 mb-4 relative">
            <div className="absolute w-5 h-5 rounded-lg bg-thinktank-accent -left-10"></div>

            <p className="text-thinktank-accent text-xl">{item.time}</p>
            <strong className="text-white text-3xl">{item.activity}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

const programme: PlanProps[] = [
  {
    date: "09.06.2023",
    day: "Piektdiena",
    dule: [
      {
        time: "8.00 - 19.00",
        activity: "Ierašanās",
      },
      {
        time: "19.00 - 19.45",
        activity: "Atklāšanas pasākums",
      },
      {
        time: "19.45 - 20.45",
        activity: "Vakariņas",
      },
      {
        time: "20.45 - 21.45",
        activity: "Brīvais laiks",
      },
      {
        time: "21.45 - 23.45",
        activity: "Saliedēšanās pasākums",
      },
      {
        time: "00.00 - 02.00",
        activity: "Neformālais pasākums",
      },
    ],
  },
  {
    date: "10.06.2023",
    day: "Sestdiena",
    dule: [
      {
        time: "8.00 - 08.30",
        activity: "Rīta rosme",
      },
      {
        time: "09.00 - 09.45",
        activity: "Brokastis",
      },
      {
        time: "10.00",
        activity: "Uzdevumu saņemšana",
      },
      {
        time: "10.00 - 11.30",
        activity: "Ideju veidošanas un validācijas lekcija",
      },
      {
        time: "11.30 - 12.30",
        activity: "Laiks darbam",
      },
      {
        time: "12.30 - 13.30",
        activity: "Pusdienas",
      },
      {
        time: "13.30 - 14.30",
        activity: "Laiks darbam",
      },
      {
        time: "14.30 - 15.30",
        activity: "Prototipēšanas, testēšanas un tirgus validācijas lekcija",
      },
      {
        time: "15.30 - 19.00",
        activity: "Laiks darbam / darbs ar mentoriem",
      },
      {
        time: "19.00 - 20.00",
        activity: "Vakariņas",
      },
      {
        time: "20.00",
        activity: "Laiks darbam",
      },
    ],
  },
  {
    date: "09.06.2023",
    day: "Svētdiena",
    dule: [
      {
        time: "8.00 - 08.30",
        activity: "Rīta rosme",
      },
      {
        time: "09.00 - 09.45",
        activity: "Brokastis",
      },
      {
        time: "09.45 - 10.00",
        activity: "Aktivitāte",
      },
      {
        time: "10.00 - 11.00",
        activity: "Prezentēšanas meisterklase",
      },
      {
        time: "11.00 - 12.00",
        activity: "Laiks darbam",
      },
      {
        time: "12.00 - 13.00",
        activity: "Pusdienas",
      },
      {
        time: "13.00",
        activity: "Prezentāciju iesūtīšana",
      },
      {
        time: "13.30 - 17.00",
        activity: "Prezentācijas",
      },
      {
        time: "19.00 - 22.00",
        activity: "Beigu pasākums",
      },
    ],
  },
];

const ProgrammeContainer = () => {
  return (
    <section className="w-full flex flex-col my-20 items-center justify-center">
      <strong className="mt-12 2xl:mt-16 tracking-[7.5px] text-[40px] lg:text-[80px] font-bolder mb-8 text-thinktank-accent">
        Programma
      </strong>

      <div className="grid items-center justify-center place-content-center place-items-center gap-10 sm:grid-cols-2">
        {programme.map((item, i) => (
          <Plan key={i} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ProgrammeContainer;
