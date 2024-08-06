import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../services/api";
import { Container, Typography } from "@mui/material";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      const { data } = await fetchBookById(id);
      setBook(data);
    };
    getBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {book.title}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {book.author}
      </Typography>
      <Typography variant="body1">{book.description}</Typography>
    </Container>
  );
};

export default BookDetail;
