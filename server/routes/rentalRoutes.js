const express = require("express");
const router = express.Router();
const { rentBook, returnBook } = require("../controllers/rentalController");
const { protect } = require("../middleware/authMiddleware");

router.post("/rent", protect, rentBook);

router.post("/return/:rentalId", protect, returnBook);

module.exports = router;
