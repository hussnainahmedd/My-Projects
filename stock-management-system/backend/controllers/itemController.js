const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllItems = async (req, res) => { /* ... */ };
exports.updateItem = async (req, res) => { /* ... */ };
exports.deleteItem = async (req, res) => { /* ... */ };