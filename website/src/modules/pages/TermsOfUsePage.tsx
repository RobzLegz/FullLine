import React from "react";
import PageModule from "../PageModule";
import TermsOfUse from "../../components/policy/TermsOfUse";

const TermsOfUsePage = () => {
  return (
    <PageModule
      title="Spotloc lietošanas nosacījumi"
      description="Iepazīstieties ar spotloc lietošanas nosacījumiem"
    >
      <TermsOfUse />
    </PageModule>
  );
};

export default TermsOfUsePage;
