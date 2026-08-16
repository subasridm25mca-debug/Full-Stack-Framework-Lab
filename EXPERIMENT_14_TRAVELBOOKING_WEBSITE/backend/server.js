const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const bookingroutes = require("./routes/bookingroutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:4300"
}));

app.use(express.json());

// Connect MongoDB Atlas
connectDB();

// Booking Routes
app.use("/api/bookings", bookingroutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Travel Booking API is running successfully"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});