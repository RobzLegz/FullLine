import Image from "next/image";
import Link from "next/link";
import React from "react";

const MarketSection: React.FC<{
  image: string;
  title: string;
  children?: React.ReactNode;
}> = ({ image, title, children }) => {
  return (
    <section className="w-full items-center justify-start gap-4 flex flex-col-reverse lg:flex-row">
      <Image
        src={`/ilustrations/tam/${image}.svg`}
        alt="Spotloc TAM"
        width={300}
        height={300}
        draggable={false}
        className="w-[300px]"
      />

      <div className="flex flex-col items-start justify-start lg:p-8 text-lg gap-2 flex-1">
        <strong className="text-xl">{title}</strong>

        {children}
      </div>
    </section>
  );
};

const GiantPlus: React.FC<{ equals?: boolean }> = ({ equals = false }) => (
  <div className="w-full my-10 flex items-start justify-center lg:justify-start">
    <div className="lg:w-[300px] flex items-center justify-center">
      <strong className="text-6xl text-accent">{equals ? "=" : "+"}</strong>
    </div>
  </div>
);

const TamContainer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start py-40 p-4">
      <h1 className="text-center">Spotloc Baltics Market Size Estimate</h1>
      <strong className="text-center text-accent text-2xl lg:text-4xl mt-4 lg:mt-8">
        600&apos;000€ / year
      </strong>

      <Image
        src="/ilustrations/tam/tam.svg"
        alt="Spotloc TAM"
        width={400}
        height={400}
        draggable={false}
        className="mt-10"
      />

      <strong className="mt-20 mb-10 text-4xl">Calculations</strong>

      <MarketSection title="Partner+ market estimate" image="partner-plus">
        <p>
          In baltics there are ~9100 restaurants/cafes, ~1310 pubs, clubs and
          bars, ~1400 museums and galleries.
        </p>
        <p>That makes ~11810 potential clients</p>
        <p>
          Price per &quot;Partner+&quot; subscription is 5.99€ / month, making
          it around 70860€ / month or 850000€ / year
        </p>

        <div className="gap-2 pt-2 flex flex-col border-t-2 border-dashed">
          <p>
            We have already garnered interest from organizers and location
            managers who are keen on engaging in partner+ features. Therefore,
            we firmly believe that attaining a{" "}
            <span className="text-accent">25%</span> share of our service&apos;s
            available market is very probable.
          </p>
        </div>
      </MarketSection>

      <GiantPlus />

      <MarketSection
        title="Spotloc ticket selling service market estimate"
        image="tickets"
      >
        <p>In Latvia there are around 2900 events that sell tickets online</p>
        <p>Our comission is 2€ per ticket sold</p>
        <p>
          Assuming that event averages around 500 attendees, that would make us
          1000€ per event
        </p>
        <p>Or 2900000€ / year</p>

        <div className="gap-2 pt-2 flex flex-col border-t-2 border-dashed">
          <p>
            During the initial year of our ticket selling service, we intend to
            offer a highly advantageous proposition to event organizers - a
            nominal commission fee of merely 1€. Subsequently, once we have
            established our position as a reputable ticket seller, we will be in
            a position to consider revising our commission fee accordingly.
          </p>
          <p>
            We have already received interest from event organizers who are keen
            to utilize our platform for ticket sales. Consequently, we hold a
            strong conviction that by provinding the best service, achieving a{" "}
            <span className="text-accent">20%</span> market share within our
            service&apos;s available market is highly likely.
          </p>
        </div>
      </MarketSection>

      <GiantPlus />

      <MarketSection
        title="Custom location page market estimate"
        image="location-page"
      >
        <p>
          As previously mentioned, in baltics there are ~9100 restaurants/cafes,
          ~1310 pubs, clubs and bars, ~1400 museums and galleries.
        </p>
        <p>Making it ~11810 potential clients</p>
        <p>Our average price per custom page is 300€</p>
        <p>Making our TAM for this service ~ 3500000€</p>

        <div className="gap-2 pt-2 flex flex-col border-t-2 border-dashed">
          <p>
            While it is true that many of these services already have a website,
            our service distinguishes itself by providing a higher degree of
            customization within our platform.
          </p>
          <p>
            With a burgeoning client base already in place, we believe that
            attaining a substantial <span className="text-accent">50%</span>{" "}
            market share within our service&apos;s available market is highly
            probable.
          </p>
        </div>
      </MarketSection>

      <GiantPlus />

      <MarketSection
        title="Custom event page market estimate"
        image="event-page"
      >
        <p>
          As previously mentioned, in Latvia there are around 2900 events that
          sell tickets online
        </p>
        <p>Our average price per custom page is 300€</p>
        <p>Making our TAM for this service ~ 8000000€</p>

        <div className="gap-2 pt-2 flex flex-col border-t-2 border-dashed">
          <p>
            While it is true that numerous events already their own website, our
            service sets itself apart by offering an elevated level of
            customization within our platform.
          </p>
          <p>
            Given our burgeoning client base, we are highly confident in our
            ability to secure a significant{" "}
            <span className="text-accent">50%</span> market share within our
            service&apos;s available market.
          </p>
        </div>
      </MarketSection>

      <GiantPlus equals />

      <div className="w-full flex items-center justify-center lg:justify-start">
        <Image
          src="/ilustrations/tam/tam.svg"
          alt="Spotloc TAM"
          width={300}
          height={300}
          draggable={false}
          className="mt-10"
        />
      </div>

      <div className="w-full mt-20">
        <strong className="text-lg mb-4">Sources:</strong>

        <ul className="list-disc text-accent w-full">
          <li className="hover:underline break-all">
            <Link
              href="https://www.ibisworld.com/latvia/industry-statistics/restaurants-takeaway-food-operators/3420/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.ibisworld.com/latvia/industry-statistics/restaurants-takeaway-food-operators/3420/
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.ibisworld.com/estonia/industry-statistics/restaurants-takeaway-food-operators/3420/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.ibisworld.com/estonia/industry-statistics/restaurants-takeaway-food-operators/3420/
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.ibisworld.com/lithuania/industry-statistics/restaurants-takeaway-food-operators/3420/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.ibisworld.com/lithuania/industry-statistics/restaurants-takeaway-food-operators/3420/
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.ibisworld.com/latvia/industry-statistics/pubs-bars-nightclubs/3445/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.ibisworld.com/latvia/industry-statistics/pubs-bars-nightclubs/3445/
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.ibisworld.com/estonia/industry-statistics/pubs-bars-nightclubs/3445/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.ibisworld.com/estonia/industry-statistics/pubs-bars-nightclubs/3445/
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.ibisworld.com/lithuania/industry-statistics/pubs-bars-nightclubs/3445/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.ibisworld.com/lithuania/industry-statistics/pubs-bars-nightclubs/3445/
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.vietas.lv/eng/index.php?p=15&field=16&fClass=35&location=0&map=0&img=0&booking=0&product=0&page=0"
              target="_blank"
              rel="noreferrer"
            >
              https://www.vietas.lv/eng/index.php?p=15&field=16&fClass=35&location=0&map=0&img=0&booking=0&product=0&page=0
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://lrkm.lrv.lt/en/activities/museums-and-galleries"
              target="_blank"
              rel="noreferrer"
            >
              https://lrkm.lrv.lt/en/activities/museums-and-galleries
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.visitestonia.com/en/what-to-see-do/history-culture/museums-galleries#:~:text=There%20are%20about%20250%20museums,learn%20about%20in%20Estonian%20museums"
              target="_blank"
              rel="noreferrer"
            >
              https://www.visitestonia.com/en/what-to-see-do/history-culture/museums-galleries#:~:text=There%20are%20about%20250%20museums,learn%20about%20in%20Estonian%20museums
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.bilesuparadize.lv"
              target="_blank"
              rel="noreferrer"
            >
              https://www.bilesuparadize.lv
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://ra.co/events/lv/all"
              target="_blank"
              rel="noreferrer"
            >
              https://ra.co/events/lv/all
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.bilesuserviss.lv"
              target="_blank"
              rel="noreferrer"
            >
              https://www.bilesuserviss.lv
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://www.bezrindas.lv/lv/visi-pasakumi"
              target="_blank"
              rel="noreferrer"
            >
              https://www.bezrindas.lv/lv/visi-pasakumi
            </Link>
          </li>

          <li className="hover:underline break-all">
            <Link
              href="https://bookla.com/lv/client#categories"
              target="_blank"
              rel="noreferrer"
            >
              https://bookla.com/lv/client#categories
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TamContainer;
