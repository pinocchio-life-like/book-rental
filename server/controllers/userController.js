const User = require("../models/user");
const { ForbiddenError } = require("@casl/ability");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.ability.can("read", user)) {
      res.json(user);
    } else {
      throw new ForbiddenError("Not allowed");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (req.ability.can("read", "User")) {
      res.json(users);
    } else {
      throw new ForbiddenError("Not allowed");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { isapproved } = req.body;
    const user = await User.findById(id);
    if (req.ability.can("update", user)) {
      const updatedUser = await User.updateApprovalStatus(id, isapproved);
      res.json(updatedUser);
    } else {
      throw new ForbiddenError("Not allowed");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (req.ability.can("delete", user)) {
      await User.findByIdAndDelete(id);
      res.json({ message: "User deleted successfully" });
    } else {
      throw new ForbiddenError("Not allowed");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser, getAllUsers, updateUserApproval, deleteUser };
