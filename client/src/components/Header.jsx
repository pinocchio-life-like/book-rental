import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
};

export default Header;
