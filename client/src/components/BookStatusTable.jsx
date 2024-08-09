import React from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookStatusTable = () => {
  const rows = [
    {
      no: 1,
      bookNo: "6465",
      bookName: "Derto Gada",
      status: "Rented",
      price: "40 Birr",
    },
    {
      no: 1,
      bookNo: "6465",
      bookName: "Fikr Eske Mekabr",
      status: "Rented",
      price: "40 Birr",
    },
    {
      no: 1,
      bookNo: "6465",
      bookName: "The Power of Now",
      status: "Rented",
      price: "40 Birr",
    },
    {
      no: 2,
      bookNo: "5665",
      bookName: "Derto Gada",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      no: 2,
      bookNo: "5665",
      bookName: "Derto Gada",
      status: "Free",
      price: "0.0 Birr",
    },
    {
      no: 3,
      bookNo: "1755",
      bookName: "Derto Gada",
      status: "Free",
      price: "0.0 Birr",
    },
  ];

  return (
    <TableContainer sx={{ borderRadius: "8px" }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Book no.</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.bookNo}>
              <TableCell>{row.no}</TableCell>
              <TableCell>{row.bookNo}</TableCell>
              <TableCell>{row.bookName}</TableCell>
              <TableCell>
                <Typography
                  sx={{
                    color: row.status === "Rented" ? "red" : "blue",
                  }}>
                  {row.status}
                </Typography>
              </TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <IconButton aria-label="edit" size="small" color="primary">
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="small" color="error">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookStatusTable;
