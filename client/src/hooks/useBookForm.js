import { useState } from "react";
import { createBook } from "../services/api";

const useBookForm = (selectedBook, books, setSelectedBook, handleClose) => {
  const [bookData, setBookData] = useState({
    bookQuantity: "",
    rentPrice: "",
  });

  const [newBookData, setNewBookData] = useState({
    title: "",
    author: "",
    category: "",
  });

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
      alert("Book uploaded successfully!");
    } catch (error) {
      alert("Error uploading book");
    }
  };

  const handleAddNewBook = async (e) => {
    e.preventDefault();
    setSelectedBook("Add");
    books.push({
      title: newBookData.title,
      author: newBookData.author,
      category: newBookData.category,
    });
    handleClose();
  };

  return {
    bookData,
    newBookData,
    handleBookChange,
    handleNewBookChange,
    handleSubmit,
    handleAddNewBook,
  };
};

export default useBookForm;
