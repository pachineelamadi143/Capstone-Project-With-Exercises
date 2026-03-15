const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All cart routes are protected (must be logged in)
router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/update', protect, updateCartItem);
router.delete('/clear', protect, clearCart);
router.delete('/:itemId', protect, removeFromCart);

module.exports = router;