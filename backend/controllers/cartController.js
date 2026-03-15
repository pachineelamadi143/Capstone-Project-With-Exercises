const Cart = require('../models/Cart');

// GET cart by user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate('items.itemId', 'name price image');
    if (!cart) {
      return res.status(200).json({ items: [], totalAmount: 0 });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD item to cart
const addToCart = async (req, res) => {
  try {
    const { itemId, name, price, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        userId: req.user.id,
        items: [{ itemId, name, price, quantity }],
        totalAmount: price * quantity
      });
    } else {
      // Check if item already exists in cart
      const existingItem = cart.items.find(
        item => item.itemId.toString() === itemId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ itemId, name, price, quantity });
      }

      // Recalculate total
      cart.totalAmount = cart.items.reduce(
        (total, item) => total + item.price * item.quantity, 0
      );

      await cart.save();
    }

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE item from cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.itemId.toString() !== req.params.itemId && item._id.toString() !== req.params.itemId
    );

    // Recalculate total
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { itemId, cartItemId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => (item.itemId.toString() === itemId) || (item._id.toString() === itemId) || (item._id.toString() === cartItemId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate total
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );

    await cart.save();
    
    // Populate before sending back so frontend has names/prices
    const populatedCart = await Cart.findById(cart._id).populate('items.itemId', 'name price image');
    res.status(200).json({ message: 'Cart updated', cart: populatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CLEAR cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart, updateCartItem };