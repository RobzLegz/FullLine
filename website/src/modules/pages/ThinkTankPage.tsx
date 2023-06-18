import React from "react";
import PageModule from "../PageModule";
import LandingContainer from "../../components/custom/thinktank/LandingContainer";
import { Rajdhani } from "@next/font/google";
import MainInfoContainer from "../../components/custom/thinktank/MainInfoContainer";
import PrizesContainer from "../../components/custom/thinktank/Prizes";
import ProgrammeContainer from "../../components/custom/thinktank/Programme";
import PoweredBySpotloc from "../../components/custom/thinktank/PoweredBySpotloc";
// import OrganizerContainer from "../../components/custom/xtreme/OrganizerContainer";
// import Participants from "../../components/custom/xtreme/Participants";
// import TasksContainer from "../../components/custom/xtreme/Tasks";
// import GoalsContainer from "../../components/custom/xtreme/Goals";
// import Transition from "../../components/custom/xtreme/Transition";
// import ProgrammeContainer from "../../components/custom/xtreme/ProgrammeContainer";

export const radjhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--radjhani-font",
});

const ThinkTankPage = () => {
  return (
    <PageModule
      title="ThinkTank | Spotloc"
      description="Piedalieties ThinkTank 2023 hakatonā un rodiet prieku un zinātkāri jaunu un progresīvu ideju izpētē."
      customNav={<div></div>}
      className="bg-thinktank-bg overflow-hidden thinktank-page"
      ogImage="https://spotloc.lv/thinktank/synthvawe-doge-og.png"
      ogImageAlt="ThinkTank 2023 synthvawe doge"
      noMaxWidth
      customFont={radjhani}
    >
      <LandingContainer />

      <div className="px-4 w-full flex flex-col items-center justify-start">
        <MainInfoContainer />

        <PrizesContainer />

        <ProgrammeContainer />

        <PoweredBySpotloc />
      </div>
    </PageModule>
  );
};

export default ThinkTankPage;
