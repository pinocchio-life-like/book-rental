const express = require("express");
const router = express.Router();
const {
  createRental,
  returnRental,
} = require("../controllers/rentalController");
const { protect } = require("../middleware/authMiddleware");

router.post("/rent", protect, createRental);

router.post("/return/:rentalId", protect, returnRental);

module.exports = router;
