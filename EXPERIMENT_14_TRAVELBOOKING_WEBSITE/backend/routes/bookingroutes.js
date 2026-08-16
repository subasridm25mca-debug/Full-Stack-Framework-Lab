const express = require("express");

const {
  createBooking,
  getBookings
} = require("../controllers/bookingcontrollers");

const router = express.Router();

// Create a new booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getBookings);

module.exports = router;