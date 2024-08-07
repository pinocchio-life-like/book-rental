import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatisticsCard from "../components/StatisticsCard";
import BookStatusTable from "../components/BookStatusTable";
import ChartCard from "../components/ChartCard";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#f4f6f8" }}>
        <Header title="Owner / Dashboard" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column", mb: 3 }}>
              <StatisticsCard
                title="This Month Statistics"
                date="Tue, 14 Nov, 2024, 11:30 AM"
                income="ETB 9460.00"
                change="-1.5%"
                comparison="Compared to ETB9940 last month"
                lastIncome="Last Month Income ETB 25658.00"
              />
              <ChartCard
                title="Available Books"
                data={{ Fiction: 54, "Self Help": 20, Business: 26 }}
                type="pie"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <BookStatusTable />
            </Paper>
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
