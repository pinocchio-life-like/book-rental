// controllers/authController.js
const User = require("../models/user");
const AuthService = require("../services/authService");

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = AuthService.generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (
      !user ||
      !(await AuthService.validatePassword(req.body.password, user.password))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = AuthService.generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
};
