require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const rentalRoutes = require("./routes/rentalRoutes");

const { handleErrors } = require("./utils/errorHandler");
const { protect } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", authRoutes);
app.use("/api", protect, userRoutes);
app.use("/api", protect, bookRoutes);
app.use("/api", protect, rentalRoutes);

app.use(handleErrors);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
