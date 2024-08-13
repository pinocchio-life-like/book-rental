import { useState, useEffect } from "react";
import { fetchBooks } from "../services/api";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetchBooks();
        setBooks(response.data);
      } catch (err) {
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  return { books, loading, error };
};

export default useBooks;
