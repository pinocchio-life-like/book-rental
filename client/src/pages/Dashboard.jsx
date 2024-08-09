import { Box, Grid, Paper, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatisticsCard from "../components/StatisticsCard";
import BookStatusTable from "../components/BookStatusTable";
import ChartCard from "../components/ChartCard";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", padding: "12px 8px" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: "0px 15px" }}>
        <Header title="Owner / Dashboard" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: "40px 14px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "15px",
                boxShadow: "none",
                height: "85.6vh",
              }}>
              <Box sx={{ marginBottom: "30px" }}>
                <Typography
                  color={"#525256"}
                  variant="h6"
                  sx={{
                    fontSize: "20px",
                    lineHeight: "30px",
                  }}>
                  This Month Statistics
                </Typography>
                <Typography color={"#A3A3A3"} variant="body2">
                  Tue, 14 Nov, 2024, 11:30 AM
                </Typography>
              </Box>
              <StatisticsCard
                title="Income"
                income="ETB 9460.00"
                change="-1.5%"
                comparison="Compared to ETB9940 last month"
                lastIncome="Last Month Income ETB 25658.00"
              />
              <ChartCard
                title="Available Books"
                data={{ Fiction: 54, "Self Help": 20, Business: 26 }}
                type="doughnut"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 3 }}>
              <BookStatusTable />
            </Box>
            <Paper sx={{ p: 2 }}>
              <ChartCard
                title="Earning Summary"
                data={{
                  "Last 6 months": [200, 300, 150, 400, 350, 300],
                  "Same period last year": [100, 200, 130, 300, 250, 200],
                }}
                type="line"
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
