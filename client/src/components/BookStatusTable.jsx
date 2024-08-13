import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import useAbility from "../hooks/useAbility";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridOnIcon from "@mui/icons-material/GridOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import rentedIcon from "../assets/rentedIcon.svg";
import freeIcon from "../assets/freeIcon.svg";
import useBooks from "../hooks/useBooks";
import { updateBook, deleteBook } from "../services/api";

const owners = {
  "Nardos T": "https://randomuser.me/api/portraits/women/14.jpg",
  "Harry M": "https://randomuser.me/api/portraits/men/24.jpg",
  "Tesfu N": "https://randomuser.me/api/portraits/men/16.jpg",
};

const BookStatusTable = () => {
  const ability = useAbility();
  const { books, loading, error, setBooks } = useBooks();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEditOpen = (book) => {
    setSelectedBook(book);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedBook(null);
  };

  const handleEditSubmit = async () => {
    try {
      const updatedBook = await updateBook(selectedBook.id, selectedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.data.id ? updatedBook.data : book
        )
      );
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating book", error);
    }
  };

  const handleDeleteOpen = (book) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBook(selectedBook.id);
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== selectedBook.id)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  if (loading) return <Typography>Loading books...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "15px",
        bgcolor: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}>
      <Box sx={{ display: "flex", justifyContent: "right", mb: 2 }}>
        <Box>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <FilterListIcon />
          </IconButton>
          <IconButton>
            <ViewListIcon />
          </IconButton>
          <IconButton>
            <GridOnIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" color="text.primary">
          Live Book Status
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: "none",
          mt: 0,
          maxHeight: 295,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
            opacity: "30%",
          },
          "&::-webkit-scrollbar-track": {
            background: "#fff",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#A3A3A3",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#656575" }}>No.</TableCell>
              <TableCell sx={{ color: "#656575" }}>Book no.</TableCell>
              {ability.can("manages", "Owners") && (
                <TableCell sx={{ color: "#656575" }}>Owner</TableCell>
              )}
              {ability.can("update", "Book") && (
                <TableCell sx={{ color: "#656575" }}>Book Name</TableCell>
              )}
              <TableCell sx={{ color: "#656575" }}>Status</TableCell>
              <TableCell sx={{ color: "#656575" }}>Price</TableCell>
              {ability.can("update", "Book") && (
                <TableCell sx={{ color: "#656575" }}>Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={book.id}>
                <TableCell>{`0${index + 1}`}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: "#F4F5F7",
                      padding: "2px 12px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}>
                    {book.id}
                  </Box>
                </TableCell>
                {ability.can("manages", "Owners") && (
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={owners[book.owner]}
                        alt={book.owner}
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      <Typography>{book.owner}</Typography>
                    </Box>
                  </TableCell>
                )}
                {ability.can("update", "Book") && (
                  <TableCell>{book.title}</TableCell>
                )}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      src={book.isApproved ? rentedIcon : freeIcon}
                      alt={book.isApproved ? "Rented" : "Free"}
                      sx={{ width: 16, height: 16, mr: 2 }}
                    />
                    <Typography sx={{ color: "#656575" }}>
                      {book.isApproved ? "Rented" : "Free"}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "#656575" }}>
                  {book.rentprice} Birr
                </TableCell>
                {ability.can("update", "Book") && (
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => handleEditOpen(book)}>
                      <EditIcon sx={{ color: "black" }} fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDeleteOpen(book)}>
                      <DeleteIcon sx={{ color: "red" }} fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Book Title"
            fullWidth
            value={selectedBook?.title || ""}
            onChange={(e) =>
              setSelectedBook({ ...selectedBook, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            value={selectedBook?.author || ""}
            onChange={(e) =>
              setSelectedBook({ ...selectedBook, author: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Rent Price"
            fullWidth
            type="number"
            value={selectedBook?.rentprice || ""}
            onChange={(e) =>
              setSelectedBook({ ...selectedBook, rentprice: e.target.value })
            }
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the book titled :{" "}
            {selectedBook?.title}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookStatusTable;
