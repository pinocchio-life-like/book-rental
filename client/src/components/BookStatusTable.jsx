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

const owners = {
  "Nardos T": "https://randomuser.me/api/portraits/women/14.jpg",
  "Harry M": "https://randomuser.me/api/portraits/men/24.jpg",
  "Tesfu N": "https://randomuser.me/api/portraits/men/16.jpg",
};

const BookStatusTable = () => {
  const ability = useAbility();
  const { books, loading, error } = useBooks();

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
                    <IconButton aria-label="edit" size="small">
                      <EditIcon sx={{ color: "black" }} fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon sx={{ color: "red" }} fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookStatusTable;
