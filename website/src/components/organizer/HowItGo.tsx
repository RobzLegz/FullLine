import Image from "next/image";
import Link from "next/link";
import React from "react";

const HowItGo = () => {
  return (
    <section className="mb-16 w-full flex flex-col items-center justify-start">
      <strong className="text-4xl text-primary-900 mb-8">Kā tas notiek?</strong>

      <div className="grid grid-cols-2 w-full gap-2 gap-y-6 md:gap-y-4 md:gap-4">
        <div className="w-full flex items-center justify-center rounded-lg bg-gradient-to-bl from-accent-100 to-accent-200 p-2 md:p-6">
          <Image
            src="/images/organizer-register.png"
            alt="Spotloc organizer register page in macbook"
            width={600}
            height={500}
            draggable="false"
            className="w-[500px]"
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-1 md:gap-2 p-1 md:p-4">
          <strong className="text-2xl md:text-3xl text-primary-800">
            Reģistrējies
          </strong>

          <p className="text-lg">
            Lai publicētu savus pasākumus nepieciešams izveidot organizatora
            profilu. To var izdarīt{" "}
            <Link href="/auth/register" className="text-accent">
              šeit.
            </Link>
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-1 md:gap-2 p-1 md:p-4">
          <strong className="text-2xl md:text-3xl text-primary-800">
            Profils
          </strong>

          <p className="text-lg">
            Pēc reģistrācijas Jūs nonāksiet profila lapā, no kuras Jūs varēsiet
            pievienot savus pasākumus.
          </p>
        </div>
        <div className="w-full flex items-center justify-center rounded-lg p-2 md:p-6">
          <Image
            src="/images/organizer-empty-profile.png"
            alt="Spotloc empty organizer page in macbook"
            width={600}
            height={500}
            draggable="false"
            className="w-[500px]"
          />
        </div>

        <div className="w-full flex items-center justify-center rounded-lg p-2 md:p-6 bg-gradient-to-bl from-accent-100 to-black">
          <Image
            src="/images/organizer-create-event.png"
            alt="Spotloc organizer event form"
            width={600}
            height={500}
            draggable="false"
            className="w-[500px]"
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-1 md:gap-2 p-1 md:p-4">
          <strong className="text-2xl md:text-3xl text-primary-800">
            Publicējiet pasākumu
          </strong>

          <p className="text-lg">
            Lai publicētu pasākumu, jāaizpilda pieteikuma forma, kas parasti
            neaizņem vairāk kā 3 minūtes. Tur norādīsiet tādus datus kā pasākuma
            nosaukums, apraksts, norises laiks, fotogrāfijas un norises vieta.
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-1 md:gap-2 p-1 md:p-4">
          <strong className="text-2xl md:text-3xl text-accent">Aiziet!</strong>

          <p className="text-lg">
            Pēc pasākuma publicēšanas to varēs redzēt visi Spotloc lietotāji.
          </p>

          <p className="text-lg">
            Savā profilā varēsiet redzēt cik lietotāji ir redzējuši Jūsu
            pasākumu, cik ir apmeklējuši Jūsu norādīto mājaslapu u.t.t.
          </p>
        </div>
        <div className="w-full flex items-center justify-center rounded-lg p-2 md:p-6">
          <Image
            src="/images/organizer-profile-data.png"
            alt="Spotloc organizer page with data in macbook"
            width={600}
            height={500}
            draggable="false"
            className="w-[500px]"
          />
        </div>
      </div>

      <Link
        href="/auth/register"
        className="form_button rounded-md h-12 w-60 mt-4"
      >
        Kļūt par organizatoru
      </Link>
    </section>
  );
};

export default HowItGo;
