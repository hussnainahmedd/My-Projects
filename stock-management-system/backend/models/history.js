const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ['Created', 'Updated', 'Deleted'],
    required: true
  },
  itemName: String,
  category: String,
  quantity: Number,
  price: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('History', historySchema);
