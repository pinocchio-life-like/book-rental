import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { UploadFile } from "@mui/icons-material";
import fileUploadIcon from "../assets/fileUploadIcon.svg";
import { useState } from "react";

const Owners = () => {
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const books = ["Book 1", "Book 2", "Add"];

  return (
    <Box sx={{ display: "flex", height: "100vh", padding: "12px 8px", mb: 5 }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: "0px 15px" }}>
        <Header title="Owner / Dashboard" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                borderRadius: "8px",
                mt: 0,
                height: "87vh",
                padding: 4,
                bgcolor: "#fff",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Typography
                sx={{ color: "#525256", lineHeight: "24px" }}
                variant="h5"
                gutterBottom>
                Upload New Book
              </Typography>

              <Autocomplete
                options={books}
                fullWidth
                sx={{ mt: 2, mb: 2, maxWidth: 300 }}
                value={selectedBook}
                onChange={(event, newValue) => {
                  setSelectedBook(newValue);
                  if (newValue === "Add") {
                    handleClickOpen();
                  }
                }}
                renderOption={(props, option, { index }) => (
                  <li
                    {...props}
                    style={{
                      borderBottom:
                        index === books.length - 2
                          ? "1px solid #DEDEDE"
                          : "none",
                      marginTop: index === books.length - 1 ? 5 : 0,
                      color: index === books.length - 1 ? "#00ABFF" : "black",
                    }}>
                    {option}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search book by name or Author"
                    variant="outlined"
                  />
                )}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  mt: 18,
                }}>
                <TextField
                  label="Book Quantity"
                  variant="outlined"
                  fullWidth
                  type="number"
                  inputProps={{ min: 1 }}
                  sx={{ mb: 2, width: 300 }}
                />
                <TextField
                  label="Rent price for 2 weeks"
                  variant="outlined"
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                  sx={{ mb: 2, width: 300 }}
                />
              </Box>

              <Button
                variant="outlined"
                startIcon={
                  <Box
                    component="img"
                    src={fileUploadIcon}
                    alt={"Upload Icon"}
                    sx={{
                      width: 16,
                      height: 16,
                      mr: 1,
                    }}
                  />
                }
                sx={{
                  mb: 3,
                  mt: 5,
                  color: "#00ABFF",
                  border: "none",
                  fontWeight: 600,
                  "&:hover": {
                    border: "none",
                  },
                }}>
                Upload Book Cover
              </Button>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: "#00ABFF",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#0056b3",
                  },
                  borderRadius: "18px",
                  maxWidth: 200,
                  mt: 5,
                  py: 3,
                  px: 20,
                }}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Dialog for adding new book */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Book Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Book Quantity"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Rent Price"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<UploadFile />}
            sx={{ mb: 3 }}>
            Upload Book Cover
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Owners;
