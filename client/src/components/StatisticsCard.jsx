import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatisticsCard = ({
  title,
  date,
  income,
  change,
  comparison,
  lastIncome,
}) => {
  return (
    <Card sx={{ mb: 3, boxShadow: "0px 8px 10px #4545501A" }}>
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
            This month
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "28px",
              fontWeight: "700",
              lineHeight: "40px",
            }}>
            {income}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            fontSize={16}
            fontWeight={600}
            sx={{
              color: change.includes("-") ? "error.main" : "success.main",
            }}>
            {change}
          </Typography>
        </Box>
        <Typography mt={1} variant="body2" color="textSecondary">
          {comparison}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {lastIncome}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
