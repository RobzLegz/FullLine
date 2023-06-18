import React from "react";
import PageModule from "../PageModule";
import CookiesPolicy, {
  CookiesPolicyLatvian,
} from "../../components/policy/CookiesPolicy";

const CookiesPolicyPage = () => {
  return (
    <PageModule
      title="Spotloc sīkfailu politika"
      description="Iepazīstieties ar spotloc sīkfailu politiku"
    >
      <CookiesPolicyLatvian />

      <CookiesPolicy />
    </PageModule>
  );
};

export default CookiesPolicyPage;
