import { useState } from "react";
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
import { Doughnut, Line } from "react-chartjs-2";

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

  const doughnutData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#006AFF", "#52C93F", "#FF2727"],
        hoverBackgroundColor: ["#006AFF", "#52C93F", "#FF2727"],
        borderColor: "#fff",
        cutout: "75%",
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
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(168,203,252, 1)");
          gradient.addColorStop(1, "rgba(253, 253, 254, 0.1)");
          return gradient;
        },
        borderColor: "#257ffe",
        tension: 0.4,
      },
      {
        label: "Same period last year",
        data: data["Same period last year"],
        fill: false,
        borderColor: "#656575",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const doughnutOptions = {
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

  const graphOptions = {
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
          borderDash: [8, 4],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
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
        width: "100%",
        borderRadius: "15px",
      }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Typography color={"#656575"} variant="h6">
              {title}
            </Typography>
            {type !== "doughnut" && (
              <Select
                value={period}
                onChange={handlePeriodChange}
                variant="standard"
                disableUnderline
                sx={{
                  mr: 2,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#656575",
                }}>
                <MenuItem value="Mar 2022 - Oct 2024">
                  Mar 2022 - Oct 2024
                </MenuItem>
                <MenuItem value="Jan 2021 - Dec 2023">
                  Jan 2021 - Dec 2023
                </MenuItem>
              </Select>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {type !== "doughnut" && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#656575",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      mr: 2,
                    }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: "#006AFF",
                        borderRadius: "50%",
                        mr: 1,
                      }}
                    />
                    Last 6 months
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#656575",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: "#656575",
                        borderRadius: "50%",
                        mr: 1,
                        border: "0px",
                      }}
                    />
                    Same period last year
                  </Typography>
                </Box>
              </>
            )}
            {type === "doughnut" && (
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ bgcolor: "#F4F5F7", px: 0.8 }}>
                Today
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            height: type === "doughnut" ? "" : 370,
            width: "100%",
            display: "flex",
          }}>
          {type === "doughnut" ? (
            <Doughnut
              data={doughnutData}
              options={doughnutOptions}
              style={{ marginTop: 20 }}
            />
          ) : (
            <Line
              width={1200}
              height={370}
              data={lineData}
              options={graphOptions}
            />
          )}
        </Box>
        {type === "doughnut" && (
          <Box sx={{ my: 6, px: 2 }}>
            {Object.entries(data).map(([key, value], index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Box
                  sx={{
                    width: 15,
                    height: 15,
                    bgcolor: ["#006AFF", "#52C93F", "#FF2727"][index],
                    borderRadius: "50%",
                    mr: 1,
                  }}
                />
                <Typography fontSize={18} variant="body2" sx={{ flexGrow: 1 }}>
                  {key}
                </Typography>
                <Typography fontSize={18} variant="body2">
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
