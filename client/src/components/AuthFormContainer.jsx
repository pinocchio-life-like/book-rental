import React from "react";
import { Container, Box, Typography } from "@mui/material";
import logo2 from "../assets/logo2.svg";

const AuthFormContainer = ({ title, children }) => (
  <Container
    component="main"
    maxWidth="xs"
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 2,
    }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <img src={logo2} alt="Logo" style={{ width: 50, marginRight: 8 }} />
      <Typography component="h1" variant="h5">
        Book Rent
      </Typography>
    </Box>
    <Typography
      component="h2"
      variant="h6"
      sx={{ mb: 1, borderBottom: "2px solid #f0f0f0" }}>
      {title}
    </Typography>
    {children}
  </Container>
);

export default AuthFormContainer;
