const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/userController");
const { caslMiddleware } = require("../middleware/caslMiddleware");

router.get("/users/:id", caslMiddleware, getUser);

module.exports = router;
