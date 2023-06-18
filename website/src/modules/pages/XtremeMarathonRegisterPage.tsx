import React from "react";
import PageModule from "../PageModule";
import Navigation from "../../components/custom/xtreme/Navigation";
import Register from "../../components/custom/xtreme/Register";

const XtremeMarathonRegisterPage = () => {
  return (
    <PageModule
      title="Xtreme Programmēšanas Maratons | Reģistrācija"
      description='Reģistrējies "Xtreme Programmēšanas Maratons" un iepazīsti extrēmās programmēšanas pamatprincipus!'
      customNav={Navigation()}
      className="bg-secondary-900"
      ogImage="https://spotloc.lv/images/spotloc-extremas-programmesanas-hakatons.png"
      ogImageAlt="Spotloc extremas programmēšanas hakatons 2023 seja"
    >
      <Register />
    </PageModule>
  );
};

export default XtremeMarathonRegisterPage;
