const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      fullName: {
        type: String,
        required: true
      },

      firstName: {
        type: String
      },

      lastName: {
        type: String
      },

      email: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        required: true
      },

      address: {
        type: String,
        required: true
      }
    },

    items: [
      {
        productId: String,
        name: String,
        category: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],

    paymentMethod: {
      type: String,
      required: true
    },

    subtotal: {
      type: Number,
      required: true
    },

    shipping: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);