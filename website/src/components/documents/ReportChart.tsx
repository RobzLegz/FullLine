import React from "react";
import { Bar } from "react-chartjs-2";
import Chart, { CategoryScale, ChartData } from "chart.js/auto";

Chart.register(CategoryScale);

const ReportChart: React.FC<{ data: ChartData<"bar", number[], number> }> = ({
  data,
}) => {
  return (
    <div className="w-full max-w-[600px]">
      <Bar data={data} className="w-full" />
    </div>
  );
};

export default ReportChart;

export const UserChart = () => {
  const data: any = {
    labels: ["Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Users",
        data: [8, 275, 820, 1239],
        borderColor: "#EB3355",
        backgroundColor: "#EB3355",
        borderWidth: 2,
      },
    ],
  };

  return <ReportChart data={data} />;
};

export const RewenueChart = () => {
  const data: any = {
    labels: ["Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Rewenue",
        data: [0, 20, 40, 200],
        borderColor: "#BE1953",
        backgroundColor: "#BE1953",
        borderWidth: 2,
      },
    ],
  };

  return <ReportChart data={data} />;
};

export const PartnerChart = () => {
  const data: any = {
    labels: ["Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Partners",
        data: [0, 0, 6, 17],
        borderColor: "#771F49",
        backgroundColor: "#771F49",
        borderWidth: 2,
      },
    ],
  };

  return <ReportChart data={data} />;
};

export const EventChart = () => {
  const data: any = {
    labels: ["Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Events",
        data: [2235, 5043, 6438, 7789],
        borderColor: "#EB3355",
        backgroundColor: "#EB3355",
        borderWidth: 2,
      },
    ],
  };

  return <ReportChart data={data} />;
};
