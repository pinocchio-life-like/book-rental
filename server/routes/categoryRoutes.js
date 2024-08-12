const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/categoriesController");
const { protect } = require("../middleware/authMiddleware");

router.get("/categories", getCategories);

module.exports = router;
