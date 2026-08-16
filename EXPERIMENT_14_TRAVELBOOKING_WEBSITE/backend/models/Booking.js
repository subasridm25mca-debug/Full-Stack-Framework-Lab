const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    destination: {
      type: String,
      required: true
    },

    travelDate: {
      type: String,
      required: true
    },

    travellers: {
      type: String,
      required: true
    },

    package: {
      type: String,
      required: true
    },

    requests: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);