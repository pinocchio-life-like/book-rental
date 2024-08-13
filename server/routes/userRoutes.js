const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  updateUserApproval,
  deleteUser,
} = require("../controllers/userController");
const { caslMiddleware } = require("../middleware/caslMiddleware");

router.get("/user/:id", caslMiddleware, getUser);
router.get("/users", caslMiddleware, getAllUsers);
router.patch("/users/:id", caslMiddleware, updateUserApproval);
router.delete("/users/:id", caslMiddleware, deleteUser);

module.exports = router;
