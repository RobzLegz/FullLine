import React from "react";
import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";
import { ProfileInfoTab } from "./Profile";
import { AppInfo, selectApp } from "../../../redux/slices/appSlice";
import { useSelector } from "react-redux";

Chart.register(CategoryScale);

const MonthlyData = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <ProfileInfoTab
      className="col-span-2"
      title={<strong>Statistika</strong>}
      noData={!appInfo.viewChartData}
    >
      {appInfo.viewChartData ? <Line data={appInfo.viewChartData} /> : null}
    </ProfileInfoTab>
  );
};

export default MonthlyData;
