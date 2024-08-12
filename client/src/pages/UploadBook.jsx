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
  MenuItem,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import fileUploadIcon from "../assets/fileUploadIcon.svg";
import { useState } from "react";
import { createBook } from "../services/api";

const Owners = () => {
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookData, setBookData] = useState({
    bookQuantity: "",
    rentPrice: "",
  });

  const [newBookData, setNewBookData] = useState({
    title: "",
    author: "",
    category: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const books = ["Book 1", "Book 2", "Add"];

  const handleBookChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleNewBookChange = (e) => {
    setNewBookData({ ...newBookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook(bookData);
      alert("Book uploaded successfully!");
    } catch (error) {
      alert("Error uploading book");
    }
  };

  const handleAddNewBook = async (e) => {
    e.preventDefault();
    console.log(newBookData);
    alert(`Adding new book: ${newBookData.title}`);
    setOpen(false);
  };

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

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
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
                    name="bookQuantity"
                    value={bookData.bookQuantity}
                    onChange={handleBookChange}
                  />
                  <TextField
                    label="Rent price for 2 weeks"
                    variant="outlined"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0 }}
                    sx={{ mb: 2, width: 300 }}
                    name="rentPrice"
                    value={bookData.rentPrice}
                    onChange={handleBookChange}
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
                  type="submit"
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
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "24px 32px",
            maxWidth: "400px",
            margin: "auto",
          },
        }}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#3A3A3C",
            fontSize: "20px",
            marginBottom: "16px",
          }}>
          Add Book
        </DialogTitle>
        <form onSubmit={handleAddNewBook}>
          <DialogContent>
            <TextField
              label="Book Name"
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                marginBottom: "16px",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                "& .MuiInputLabel-root": {
                  fontWeight: "500",
                  color: "#3A3A3C",
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F5F7",
                  "& fieldset": {
                    borderColor: "#D9D9D9",
                  },
                  "&:hover fieldset": {
                    borderColor: "#007bff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#007bff",
                  },
                },
              }}
              name="title"
              value={newBookData.title}
              onChange={handleNewBookChange}
            />
            <TextField
              label="Author Name"
              variant="outlined"
              fullWidth
              sx={{
                marginBottom: "16px",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                "& .MuiInputLabel-root": {
                  fontWeight: "500",
                  color: "#3A3A3C",
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F5F7",
                  "& fieldset": {
                    borderColor: "#D9D9D9",
                  },
                  "&:hover fieldset": {
                    borderColor: "#007bff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#007bff",
                  },
                },
              }}
              name="author"
              value={newBookData.author}
              onChange={handleNewBookChange}
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              select
              sx={{
                marginBottom: "24px",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                "& .MuiInputLabel-root": {
                  fontWeight: "500",
                  color: "#3A3A3C",
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F5F7",
                  "& fieldset": {
                    borderColor: "#D9D9D9",
                  },
                  "&:hover fieldset": {
                    borderColor: "#007bff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#007bff",
                  },
                },
              }}
              name="category"
              value={newBookData.category}
              onChange={handleNewBookChange}>
              <MenuItem value="Category 1">Category 1</MenuItem>
              <MenuItem value="Category 2">Category 2</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              paddingBottom: "24px",
            }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: "#007bff",
                borderRadius: "8px",
                padding: "12px 0",
                textTransform: "none",
                fontWeight: "bold",
                maxWidth: "280px",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Owners;
