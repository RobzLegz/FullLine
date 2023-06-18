import React from "react";
import PageModule from "../PageModule";
import LandingContainer from "../../components/custom/xtreme/LandingContainer";
import Navigation from "../../components/custom/xtreme/Navigation";
import OrganizerContainer from "../../components/custom/xtreme/OrganizerContainer";
import Participants from "../../components/custom/xtreme/Participants";
import TasksContainer from "../../components/custom/xtreme/Tasks";
import GoalsContainer from "../../components/custom/xtreme/Goals";
import Transition from "../../components/custom/xtreme/Transition";
import ProgrammeContainer from "../../components/custom/xtreme/ProgrammeContainer";

const XtremeMarathonPage = () => {
  return (
    <PageModule
      title="Xtreme Programmēšanas Maratons | Spotloc"
      description="Iepazīsti extrēmās programmēšanas pamatprincipus, atrisini programmēšanas problēmas un saņem vērtīgas balvas!"
      customNav={Navigation()}
      className="bg-secondary-900"
      ogImage="https://spotloc.lv/images/spotloc-extremas-programmesanas-hakatons.png"
      ogImageAlt="Spotloc extremas programmēšanas hakatons 2023 seja"
    >
      <LandingContainer />

      <TasksContainer />

      <GoalsContainer />

      <Participants />

      <OrganizerContainer />

      <ProgrammeContainer />

      <Transition />
    </PageModule>
  );
};

export default XtremeMarathonPage;
