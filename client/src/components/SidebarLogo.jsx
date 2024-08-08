import { Box, Typography } from "@mui/material";
import logo from "../assets/logo3.svg";

const SidebarLogo = ({ expanded }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
    }}>
    {expanded && (
      <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
        <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
        <Typography color={"#00ABFF"} variant="h6" noWrap>
          Book Rent
        </Typography>
      </Box>
    )}
  </Box>
);

export default SidebarLogo;
