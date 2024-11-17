const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  medicineName: { type: String, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);
