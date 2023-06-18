import React from "react";
import PageModule from "../PageModule";
import PrivacyPolicy, {
  PrivacyPolicyLatvian,
} from "../../components/policy/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <PageModule
      title="Spotloc privātuma politika"
      description="Iepazīstieties ar spotloc privātuma politiku"
    >
      <PrivacyPolicyLatvian />

      <PrivacyPolicy />
    </PageModule>
  );
};

export default PrivacyPolicyPage;
