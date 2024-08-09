import { Box, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BookStatusTable from "../components/BookStatusTable";

const Owners = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", padding: "12px 8px", mb: 5 }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: "0px 15px" }}>
        <Header title="Owner / Dashboard" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Box sx={{ mb: 2 }}>
              <BookStatusTable />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Owners;
