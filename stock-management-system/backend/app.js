require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const History = require('./models/history');
const path = require('path');
const connectDB = require('./config/db');
const Item = require('./models/Item'); 
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'my_secret_key'; 
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = [{ username: 'DB', password: '0702' }];
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});


app.get('/api/items', authenticateToken, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err.message });
  }
});

app.post('/api/items', authenticateToken, async (req, res) => {
  const { name, category, quantity, price } = req.body;

  try {
    const newItem = new Item({ name, category, quantity, price });
    await newItem.save();

    await History.create({
      action: 'Created',
      itemName: name,
      category,
      quantity,
      price
    });

    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item', error });
  }
});

app.put('/api/items/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, category, quantity, price },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await History.create({
      action: 'Updated',
      itemName: name,
      category,
      quantity,
      price
    });

    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/items/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (item) {
      await History.create({
        action: 'Deleted',
        itemName: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price
      });
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error });
  }
});

app.get('/api/history', authenticateToken, async (req, res) => {
  try {
    const history = await History.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});


app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});