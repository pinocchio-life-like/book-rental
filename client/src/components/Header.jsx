import { Box, Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Box sx={{ mb: 3, background: "white", padding: 2, borderRadius: "15px" }}>
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
};

export default Header;
