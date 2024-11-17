const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders (GET /api/orders)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order (POST /api/orders)
router.post('/', async (req, res) => {
  const order = new Order({
    user: req.body.user,
    medicineName: req.body.medicineName,
  });
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
