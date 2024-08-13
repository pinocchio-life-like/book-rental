const express = require("express");
const router = express.Router();
const {
  getBookById,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { caslMiddleware } = require("../middleware/caslMiddleware");

router.get("/book/:id", caslMiddleware, getBookById);
router.get("/books", caslMiddleware, getBooks);
router.post("/books", caslMiddleware, createBook);
router.put("/books/:id", caslMiddleware, updateBook);
router.delete("/books/:id", caslMiddleware, deleteBook);

module.exports = router;
