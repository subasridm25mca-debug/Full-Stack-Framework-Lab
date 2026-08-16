const express = require('express');
const Order = require('../models/order');

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {

  try {

    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder
    });

  } catch (error) {

    console.error('Order error:', error);

    res.status(400).json({
      message: 'Failed to place order',
      error: error.message
    });

  }

});


// Get all orders
router.get('/', async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: 'Failed to fetch orders'
    });

  }

});


module.exports = router;