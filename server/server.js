require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const rentalRoutes = require("./routes/rentalRoutes");

const { handleErrors } = require("./utils/errorHandler");
const { protect } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", protect, userRoutes);
app.use("/api/books", protect, bookRoutes);
app.use("/api/rentals", protect, rentalRoutes);

app.use(handleErrors);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
