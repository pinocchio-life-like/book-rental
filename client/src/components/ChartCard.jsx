import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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
import { Doughnut, Line } from "react-chartjs-2";

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
  const doughnutData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#006AFF", "#52C93F", "#FF2727"],
        hoverBackgroundColor: ["#006AFF", "#52C93F", "#FF2727"],
        borderColor: "#fff",
        cutout: "75%", // Make the chart hollow
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
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <Card
      sx={{
        boxShadow: "0px 8px 10px #4545501A",
      }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography color={"#656575"} variant="h6">
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ bgcolor: "#F4F5F7", px: 0.8 }}>
            Today
          </Typography>
        </Box>
        {type === "doughnut" ? (
          <Doughnut
            data={doughnutData}
            options={options}
            style={{ padding: 40 }}
          />
        ) : (
          <Line data={lineData} options={options} />
        )}
        {type === "doughnut" && (
          <Box sx={{ mt: 2 }}>
            {Object.entries(data).map(([key, value], index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: ["#36A2EB", "#4CAF50", "#FF6384"][index],
                    borderRadius: "50%",
                    mr: 1,
                  }}
                />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {key}
                </Typography>
                <Typography variant="body2">{value}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
