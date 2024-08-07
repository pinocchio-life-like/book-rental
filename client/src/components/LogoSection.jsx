import React from "react";
import { Box } from "@mui/material";
import logo1 from "../assets/logo1.svg";

const LogoSection = () => (
  <Box
    sx={{
      width: "50%",
      bgcolor: "#171b36",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
    <img src={logo1} alt="Logo" />
  </Box>
);

export default LogoSection;
