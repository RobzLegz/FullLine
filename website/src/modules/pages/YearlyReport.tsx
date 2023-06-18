import React from "react";
import PageModule from "../PageModule";
import YearlyReportContainer from "../../components/documents/YearlyReportContainer";

const YearlyReport = () => {
  return (
    <PageModule
      title="Spotloc | Yearly Report"
      description="Spotloc company report"
      className="bg-primary-900"
      navBg="#0D1321"
    >
      <YearlyReportContainer />
    </PageModule>
  );
};

export default YearlyReport;
