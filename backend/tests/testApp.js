const express = require('express');
const cors = require('cors');

// Create test express app without starting an HTTP server or real DB
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/categories', require('../routes/categoryRoutes'));
app.use('/api/menu', require('../routes/menuItemRoutes'));
app.use('/api/cart', require('../routes/cartRoutes'));
app.use('/api/orders', require('../routes/orderRoutes'));
app.use('/api/payments', require('../routes/paymentRoutes'));
app.use('/api/messages', require('../routes/messageRoutes'));
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/address', require('../routes/addressRoutes'));

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Pizza Store API is running!' });
});

module.exports = app;
