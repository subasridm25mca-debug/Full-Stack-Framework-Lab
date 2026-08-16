const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);

    const savedBooking = await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message
    });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBookings
};