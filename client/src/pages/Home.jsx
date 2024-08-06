import { useEffect, useState } from "react";
import { fetchBooks } from "../services/api";
import BookCard from "../components/BookCard";
import { Grid, Container, Typography } from "@mui/material";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const { data } = await fetchBooks();
      setBooks(data);
    };
    getBooks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Available Books
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
