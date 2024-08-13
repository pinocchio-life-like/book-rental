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
import smileIcon from "../assets/smileIcon.svg";
import { useState, useEffect } from "react";
import { createBook, fetchBooks } from "../services/api";
import useCategories from "../hooks/useCategories";
import useDialog from "../hooks/useDialog";

const UploadBook = () => {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const { open, handleClickOpen, handleClose } = useDialog();

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({
    bookQuantity: "",
    rentPrice: "",
  });

  const [newBookData, setNewBookData] = useState({
    title: "",
    author: "",
    category: "",
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetchBooks();
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    fetchBookData();
  }, []);

  const handleBookChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleNewBookChange = (e) => {
    setNewBookData({ ...newBookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalBookData;
    if (selectedBook === "Add") {
      finalBookData = { ...bookData, ...newBookData };
    } else {
      finalBookData = {
        ...bookData,
        title: selectedBook.title,
        author: selectedBook.author,
        category: selectedBook.category,
      };
    }

    try {
      await createBook(finalBookData);
      setSuccessDialogOpen(true);
      setBookData({ bookQuantity: "", rentPrice: "" });
      setSelectedBook(null);
      setNewBookData({ title: "", author: "", category: "" });

      setTimeout(() => {
        setSuccessDialogOpen(false);
      }, 10000);
    } catch (error) {
      alert("Error uploading book");
    }
  };

  const handleAddNewBook = async (e) => {
    e.preventDefault();

    const newBook = {
      title: newBookData.title,
      author: newBookData.author,
      category: newBookData.category,
    };

    setBooks([...books, newBook]);
    setSelectedBook(newBook);

    handleClose();
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

              {categoriesLoading && <p>Loading ...</p>}
              {categoriesError && <p>{categoriesError}</p>}

              {!categoriesLoading && !categoriesError && (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <Autocomplete
                    options={[
                      ...books.filter(
                        (book, index, self) =>
                          index ===
                          self.findIndex(
                            (b) =>
                              b.title === book.title && b.author === book.author
                          )
                      ),
                      { title: "Add", author: "", category: "" },
                    ]}
                    fullWidth
                    getOptionLabel={(option) =>
                      `${option.title} ${option.author}`
                    }
                    sx={{ mt: 2, mb: 2, maxWidth: 300 }}
                    value={selectedBook}
                    onChange={(event, newValue) => {
                      if (newValue.title === "Add") {
                        handleClickOpen();
                      } else {
                        setSelectedBook(newValue);
                      }
                    }}
                    renderOption={(props, option, { index }) => (
                      <li
                        {...props}
                        style={{
                          borderTop:
                            index === books.length - 1
                              ? "1px solid #DEDEDE"
                              : "none",
                          marginTop: index === books.length ? 5 : 0,
                          color: option.title === "Add" ? "#00ABFF" : "black",
                        }}>
                        {option.title} {option.author}
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
              )}
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
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
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
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "24px 32px",
            textAlign: "center",
            maxWidth: "400px",
            margin: "auto",
          },
        }}>
        <DialogContent>
          <Box
            component="img"
            src={smileIcon}
            alt="Success Icon"
            sx={{
              width: 100,
              height: 100,
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Congrats!
          </Typography>
          <Typography variant="body2" sx={{ color: "#525256", mb: 4 }}>
            Your book has been uploaded successfully. Wait until it is approved.
          </Typography>
          <Button
            onClick={() => setSuccessDialogOpen(false)}
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "#00ABFF",
              color: "#fff",
              "&:hover": {
                bgcolor: "#0056b3",
              },
            }}>
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UploadBook;
