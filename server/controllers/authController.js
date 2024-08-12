const { z } = require("zod");
const User = require("../models/user");
const AuthService = require("../services/authService");

const signupSchema = z.object({
  name: z.string().max(255),
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
  location: z.string().max(255),
  phone: z.string().max(50),
  type: z.string().optional(),
});

const signup = async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const user = await User.create({
      ...validatedData,
      role: validatedData.type || "user",
    });
    const token = AuthService.generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
});

const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const user = await User.findByEmail(validatedData.email);
    if (
      !user ||
      !(await AuthService.validatePassword(
        validatedData.password,
        user.password
      ))
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
