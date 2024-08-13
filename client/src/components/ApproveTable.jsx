import {
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
  Box,
  Switch,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridOnIcon from "@mui/icons-material/GridOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import checkIcon from "../assets/checkIcon.svg";
import useBooks from "../hooks/useBooks";
import useUsers from "../hooks/useUsers";
import {
  updateBookApproval,
  updateUserApproval,
  deleteUser,
} from "../services/api";

const TableComponent = ({ page }) => {
  const [rows, setRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const { books, loading: booksLoading, error: booksError } = useBooks();
  const { users, loading: usersLoading, error: usersError } = useUsers();

  useEffect(() => {
    if (page === "books") {
      setRows(books);
    } else if (page === "owners") {
      setRows(users);
    }
  }, [page, books, users]);

  const handleStatusToggle = async (id, isApproved) => {
    try {
      if (page === "books") {
        await updateBookApproval(id, !isApproved);
      } else if (page === "owners") {
        await updateUserApproval(id, !isApproved);
      }
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, isapproved: !isApproved } : row
      );
      setRows(updatedRows);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    try {
      if (page === "books") {
        //delete boook
      } else if (page === "owners") {
        await deleteUser(id);
      }
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  if (booksLoading || usersLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (booksError || usersError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Typography color="error">{booksError || usersError}</Typography>
      </Box>
    );
  }

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
          {page === "books" ? "Books List" : "List of Owners"}
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: "none",
          mt: 0,
          height: "79.72vh",
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
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#656575" }}>No.</TableCell>
              {page === "books" && (
                <>
                  <TableCell sx={{ color: "#656575" }}>Author</TableCell>
                  <TableCell sx={{ color: "#656575" }}>Owner</TableCell>
                  <TableCell sx={{ color: "#656575" }}>Category</TableCell>
                  <TableCell sx={{ color: "#656575" }}>Book Name</TableCell>
                  <TableCell sx={{ color: "#656575" }}>Status</TableCell>
                </>
              )}
              {page === "owners" && (
                <>
                  <TableCell sx={{ color: "#656575" }}>Owner</TableCell>
                  <TableCell sx={{ color: "#656575" }}>Uploads</TableCell>
                  <TableCell sx={{ color: "#656575" }}>Location</TableCell>
                  <TableCell sx={{ color: "#656575" }}>Action</TableCell>
                  <TableCell sx={{ color: "#656575" }}></TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{`0${index + 1}`}</TableCell>
                {page === "books" && (
                  <>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt={row.owner}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography>{row.owner}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "#656575" }}>
                        {row.category}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "#656575" }}>
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: row.isapproved
                              ? "#0080001A"
                              : "#f8d7da",
                            padding: "2px 15px",
                            borderRadius: "15px",
                          }}>
                          {row.isapproved && (
                            <Box
                              component="img"
                              src={checkIcon}
                              alt={"Check Icon"}
                              sx={{ width: 16, height: 16, mr: 2 }}
                            />
                          )}
                          <Typography
                            sx={{
                              color: row.isapproved ? "#28a745" : "#a72845",
                              fontSize: "1rem",
                            }}
                            variant="body2">
                            {row.isapproved ? "Approved" : "Pending"}
                          </Typography>
                          <Switch
                            checked={row.isapproved}
                            inputProps={{ "aria-label": "controlled" }}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#28a745",
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                {
                                  backgroundColor: "#28a745",
                                },
                            }}
                            onChange={() =>
                              handleStatusToggle(row.id, row.isapproved)
                            }
                          />
                        </Box>
                      </Box>
                    </TableCell>
                  </>
                )}
                {page === "owners" && (
                  <>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt={row.name}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography>{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "#656575" }}>
                        {row.uploads}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "#656575" }}>
                        {row.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="view"
                        size="small"
                        onClick={() => handleViewUser(row)}>
                        <VisibilityIcon
                          sx={{
                            color: "black",
                            width: 26,
                            height: 26,
                            mr: 1,
                          }}
                          fontSize="inherit"
                        />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => handleDelete(row.id)}>
                        <DeleteIcon
                          sx={{ color: "red", width: 26, height: 26 }}
                          fontSize="inherit"
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          handleStatusToggle(row.id, row.isapproved)
                        }
                        sx={{
                          bgcolor: row.isapproved ? "#00ABFF" : "#6c757d",
                          color: "#fff",
                          "&:hover": {
                            bgcolor: row.isapproved ? "#0056b3" : "#5a6268",
                          },
                        }}>
                        {row.isapproved ? "Approved" : "Approve"}
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: "15px" },
        }}
        sx={{
          bottom: "20%",
        }}>
        <DialogContent sx={{ py: 8, px: 5 }}>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={selectedUser?.name || ""}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="dense"
            label="Email address"
            fullWidth
            variant="outlined"
            value={selectedUser?.email || ""}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
            value={selectedUser?.location || ""}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={selectedUser?.phone || ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TableComponent;
