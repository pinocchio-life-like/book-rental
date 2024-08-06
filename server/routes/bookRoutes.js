const express = require("express");
const router = express.Router();
const {
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { caslMiddleware } = require("../middleware/caslMiddleware");

router.get("/books/:id", caslMiddleware, getBook);
router.post("/books", caslMiddleware, createBook);
router.put("/books/:id", caslMiddleware, updateBook);
router.delete("/books/:id", caslMiddleware, deleteBook);

module.exports = router;
