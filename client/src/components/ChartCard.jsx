import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
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
  Filler,
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
  Legend,
  Filler
);

const ChartCard = ({ title, data, type }) => {
  const [period, setPeriod] = useState("Mar 2022 - Oct 2024");

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

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
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#36A2EB",
        tension: 0.4,
      },
      {
        label: "Same period last year",
        data: data["Same period last year"],
        fill: false,
        borderColor: "#FF6384",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          borderDash: [8, 4],
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}k Birr`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant="h6">{title}</Typography>
          <Select
            value={period}
            onChange={handlePeriodChange}
            size="small"
            sx={{ ml: 2 }}>
            <MenuItem value="Mar 2022 - Oct 2024">Mar 2022 - Oct 2024</MenuItem>
            <MenuItem value="Jan 2021 - Dec 2023">Jan 2021 - Dec 2023</MenuItem>
          </Select>
        </Box>
        {type === "pie" ? (
          <Pie data={pieData} />
        ) : (
          <Line data={lineData} options={options} />
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
