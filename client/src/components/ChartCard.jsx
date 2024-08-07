import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ChartCard = ({ title, data, type }) => {
  const pieData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const lineData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Last 6 months",
        data: data["Last 6 months"],
        fill: false,
        borderColor: "#36A2EB",
      },
      {
        label: "Same period last year",
        data: data["Same period last year"],
        fill: false,
        borderColor: "#FF6384",
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {type === "pie" ? <Pie data={pieData} /> : <Line data={lineData} />}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
