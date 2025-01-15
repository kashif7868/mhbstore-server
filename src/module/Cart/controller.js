const cartService = require('./service');

// Add item to cart
exports.addItem = async (req, res) => {
  try {
    const { productId, qty, color, size, meter, userId } = req.body;
    const cart = await cartService.addItemToCart(userId, productId, qty, color, size, meter);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const { productId, userId } = req.params;
    const cart = await cartService.removeItemFromCart(userId, productId);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update item quantity
exports.updateItemQuantity = async (req, res) => {
  try {
    const { productId, qty, userId } = req.body;
    const cart = await cartService.updateItemQuantity(userId, productId, qty);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await cartService.clearCart(userId);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
