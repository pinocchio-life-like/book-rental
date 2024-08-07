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
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {date}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h4"
            sx={{
              color: change.includes("-") ? "error.main" : "success.main",
            }}>
            {income}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {change}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
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
