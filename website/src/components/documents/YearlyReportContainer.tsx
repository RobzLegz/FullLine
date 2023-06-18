import Image from "next/image";
import React from "react";
import {
  EventChart,
  PartnerChart,
  RewenueChart,
  UserChart,
} from "./ReportChart";
import Link from "next/link";

const ReportSection: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <section className="w-full flex flex-col items-center justify-start p-8 mb-10 gap-4 max-w-[1000px] text-gray-200">
      <strong className="text-4xl text-accent-100 mb-10">{title}</strong>

      {children}
    </section>
  );
};

const YearlyReportContainer = () => {
  return (
    <div className="flex flex-col items-center justify-start py-20">
      <section className="w-full h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-center text-white">Spotloc Company Report</h1>
        <strong className="text-center text-2xl mt-8 text-accent">
          SMU Spotloc V23970002022
        </strong>
      </section>

      <SummmaryContainer />

      <ProblemSolutionContainer />

      <CompetitionContainer />

      <MarketingAndSalesContainer />

      <TeamContainer />

      <FinancesContainer />

      <PotentialMarketContainer />

      <IncomeStreamContainer />

      <FuturePlansContainer />
    </div>
  );
};

export default YearlyReportContainer;

const PotentialMarketContainer = () => {
  return (
    <ReportSection title="Estimated market size">
      <Image
        src="/ilustrations/tam/tam.svg"
        alt="Spotloc team"
        width={1000}
        height={1000}
        className="w-[500px]"
        draggable={false}
      />

      <p>
        You can find our market size calculations{" "}
        <Link href="/documents/market" className="text-accent">
          here.
        </Link>
      </p>
    </ReportSection>
  );
};

const FuturePlansContainer = () => {
  return (
    <ReportSection title="Future plans">
      <Image
        src="/images/future-plans.png"
        alt="Asset/Liability"
        width={1000}
        height={1000}
        className="w-[800px]"
        draggable={false}
      />

      <div className="w-full flex flex-col gap-4 mt-4">
        <strong className="text-accent text-xl">
          Spotloc will become the largest tourism application in the Baltics
        </strong>

        <ul className="list-disc">
          <li>Implementation of advertising system</li>
          <li>“Partner +” implementation</li>
          <li>App localization</li>
          <li>All kinds of entertainment options</li>
          <li>Implementation of the route planner</li>
          <li>Sale of various types of tickets</li>
        </ul>

        <strong className="text-gray-100">
          Implementation of advertising system
        </strong>

        <p>
          To introduce an advertising system and earn from click sales, it is
          necessary to create an SMU bank account, which is currently not
          possible. Once we create an SMU bank account using the Montonio
          payment system, we will implement a campaign advertising option.
        </p>

        <strong className="text-gray-100">
          All kinds of entertainment options
        </strong>

        <p>
          The Spotloc application will provide access to all entertainment
          options - outdoor obstacle courses, spa visits, water park visits,
          concerts, and other types of entertainment for which we will sell
          tickets.
        </p>

        <strong className="text-gray-100">Ticket sales</strong>

        <p>
          To introduce a ticket sales system, an SMU bank account needs to be
          created. Once the account is created using the Montonio payment
          system, we will implement ticket sales and become a convenient
          platform for ticket trading. We will achieve this by closing contracts
          using e-signature and other digital tools to ensure a fast and
          convenient ticket selling process.
        </p>

        <strong className="text-gray-100">Partner +</strong>

        <p>
          “Partner+” is a monthly subscription that provides event organizers
          with additional features. With user consent, it allows the collection
          of attendee data (such as email addresses, phone numbers, etc.),
          provides access to more comprehensive statistics about their target
          audience and users who view their events. “Partner+” will cost 5.99€
          per month, and we will implement it using the Montonio payment system
          once the bank account is created.
        </p>

        <strong className="text-gray-100">
          Implementation of the route planner
        </strong>

        <p>
          A route planner that utilizes artificial intelligence will create a
          plan based on the user&apos;s interests, suggesting the most suitable
          events, places, cafes, and tourist attractions when visiting a
          particular city. This would be highly relevant for tourists arriving
          from other countries or cities who would immediately know what
          entertainment options are available to them.
        </p>

        <p>
          The route planner would open doors to broader collaboration and profit
          opportunities, such as advertising for cafes, museums, clubs,
          automatic booking for hotels and restaurants, ticket purchases for
          theaters, operas, and more.
        </p>
      </div>
    </ReportSection>
  );
};

const IncomeStreamContainer = () => {
  return (
    <ReportSection title="Income streams">
      <ul className="text-xl list-disc">
        <li>&quot;Partner+&quot; - monthly subscription (5.99€ / mon)</li>
        <li>Custom event / location page (100€ - 500€)</li>
        <li>Commission per ticket sold (1€)</li>
        <li>Event ads (price calculated dynamically)</li>
      </ul>
    </ReportSection>
  );
};

const FinancesContainer = () => {
  return (
    <ReportSection title="Finances">
      <Image
        src="/images/asset-liability.png"
        alt="Asset/Liability"
        width={1000}
        height={1000}
        className="w-[600px]"
        draggable={false}
      />
      <Image
        src="/images/profit-loss.png"
        alt="Profit loss"
        width={1000}
        height={1000}
        className="w-[600px]"
        draggable={false}
      />
      <Image
        src="/images/cash-flow.png"
        alt="Cash flow"
        width={1000}
        height={1000}
        className="w-[600px]"
        draggable={false}
      />
    </ReportSection>
  );
};

const TeamContainer = () => {
  return (
    <ReportSection title="Team">
      <Image
        src="/images/spotloc-team.png"
        alt="Spotloc team"
        width={1000}
        height={1000}
        className="w-[600px]"
        draggable={false}
      />
    </ReportSection>
  );
};

const MarketingAndSalesContainer = () => {
  return (
    <ReportSection title="Marketing & Sales">
      <strong className="text-gray-100">
        We reach our customers and users
      </strong>

      <ul className="list-disc gap-4 flex flex-col">
        <li>By publishing organic content on different social media apps.</li>
        <div className="grid grid-cols-3 gap-4">
          <Image
            src="/images/spotloc-instagram.jpg"
            alt="Spotloc instagram account"
            width={200}
            height={500}
            draggable={false}
          />
          <Image
            src="/images/spotloc-tiktok.jpg"
            alt="Spotloc tiktok account"
            width={200}
            height={500}
            draggable={false}
          />
          <Image
            src="/images/spotloc-youtube.jpg"
            alt="Spotloc youtube account"
            width={200}
            height={500}
            draggable={false}
          />
          <Image
            src="/images/spotloc-linkedin.jpg"
            alt="Spotloc linkedin account"
            width={200}
            height={500}
            draggable={false}
          />
          <Image
            src="/images/spotloc-team-instagram.jpg"
            alt="Spotloc team instagram account"
            width={200}
            height={500}
            draggable={false}
          />
          <Image
            src="/images/spotloc-events-instagram.jpg"
            alt="Spotloc events instagram account"
            width={200}
            height={500}
            draggable={false}
          />
        </div>
        <li>Through website SEO</li>
        <Image
          src="/images/spotloc-website-seo.png"
          alt="Spotloc website SEO"
          width={500}
          height={200}
          draggable={false}
        />
        <li>Through spotloc app listings on app stores</li>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Image
            src="/images/spotloc-app-store.png"
            alt="Spotloc App Store listing"
            width={200}
            height={500}
            draggable={false}
          />
          <Image
            src="/images/spotloc-play-store.png"
            alt="Spotloc play store listing"
            width={200}
            height={500}
            draggable={false}
          />
        </div>
      </ul>
    </ReportSection>
  );
};

const CompetitionContainer = () => {
  return (
    <ReportSection title="Competition">
      <table className="w-full">
        <thead>
          <tr>
            <td className="flex-1"></td>
            <td className="w-12">
              <Image
                src="/spotloc-s.svg"
                alt="spotloc logo"
                width={30}
                height={50}
                className="text-xl"
                draggable="false"
              />
            </td>
            <td className="w-20">
              <Image
                src="/icons/facebook-logo.png"
                alt="spotloc logo"
                width={50}
                height={50}
                className="text-xl"
                draggable="false"
              />
            </td>
            <td className="w-20">
              <Image
                src="/icons/bilesu-serviss-logo.png"
                alt="spotloc logo"
                width={100}
                height={50}
                className="text-xl"
                draggable="false"
              />
            </td>
            <td className="w-20">
              <Image
                src="/icons/kurdoties-logo.png"
                alt="spotloc logo"
                width={100}
                height={50}
                className="text-xl"
                draggable="false"
              />
            </td>
            <td className="w-20">
              <Image
                src="/icons/raco-logo.png"
                alt="spotloc logo"
                width={50}
                height={50}
                className="text-xl"
                draggable="false"
              />
            </td>
          </tr>
        </thead>
        <tbody className="text-gray-200">
          <tr>
            <td className="flex-1">Large local event dataset</td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl">✅</td>
          </tr>
          <tr>
            <td className="flex-1">AI-driven event recommendation</td>
            <td className="text-xl">✅</td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl"></td>
            <td className="text-xl"></td>
          </tr>
          <tr>
            <td className="flex-1">Easy to use ads platform</td>
            <td className="text-xl">✅</td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl"></td>
            <td className="text-xl"></td>
          </tr>
          <tr>
            <td className="flex-1">Advanced search engine</td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl">✅</td>
          </tr>
          <tr>
            <td className="flex-1">Quick and easy event publication</td>
            <td className="text-xl">✅</td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
          </tr>
          <tr>
            <td className="flex-1">Interactive event map</td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl"></td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
          </tr>
          <tr>
            <td className="flex-1">Geolocation-based event recommendation</td>
            <td className="text-xl">✅</td>
            <td className="text-xl"></td>
            <td className="text-xl"></td>
            <td className="text-xl"></td>
            <td className="text-xl"></td>
          </tr>
        </tbody>
      </table>
    </ReportSection>
  );
};

const ProblemSolutionContainer = () => {
  return (
    <ReportSection title="Problem & Solution">
      <ul className="list-disc text-gray-200 gap-2 flex flex-col">
        <li>
          Navigating the vast landscape of events has become increasingly
          challenging, making it difficult for individuals to find events that
          truly align with their interests and preferences.
        </li>
        <li>
          Promoting events and locations is a complex task, fraught with
          difficulties such as limited reach, ineffective targeting, high
          competition, and the challenge of standing out in a crowded
          marketplace.
        </li>
      </ul>

      <div className="w-full flex flex-col text-gray-200 gap-1">
        <strong className="text-gray-100">For users we offer</strong>

        <ul className="list-disc">
          <li>Personalized recommendations for local events and locations</li>
          <li>Aggregation of information from multiple sources</li>
          <li>Simplified exploration of local events and hidden gems</li>
        </ul>
      </div>

      <div className="w-full flex flex-col text-gray-200 gap-1">
        <strong className="text-gray-100">For partners we offer</strong>

        <ul className="list-disc">
          <li>
            Targeted promotion to reach a specific audience for events and
            locations
          </li>
          <li>Centralized advertising channels for wider visibility</li>
          <li>
            Enhanced exposure and increased awareness for events and locations
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 text-gray-100 w-full">
        <strong>Customer Interviews:</strong>

        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/CBKKyXKFDBs"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex flex-col gap-4 text-gray-100 w-full">
        <strong>Spotloc Pitch:</strong>

        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/bqW_dEtNbdc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </ReportSection>
  );
};

const SummmaryContainer = () => {
  return (
    <ReportSection title="Summary">
      <strong className="text-2xl mb-4 text-gray-200">
        Fully Developed Spotloc App v1.3
      </strong>

      <Image
        src="/images/spotloc-design.png"
        alt="Spotloc 1.2 app design"
        width={400}
        height={800}
        draggable={false}
      />

      <strong className="text-2xl mb-4 mt-8 text-gray-200">
        User count by month
      </strong>

      <UserChart />

      <strong className="text-2xl mb-4 mt-8 text-gray-200">
        Rewenue by month
      </strong>

      <RewenueChart />

      <strong className="text-2xl mb-4 mt-8 text-gray-200">
        Partner count by month
      </strong>

      <PartnerChart />

      <strong className="text-2xl mb-4 mt-8 text-gray-200">
        Event count by month
      </strong>

      <EventChart />
    </ReportSection>
  );
};
