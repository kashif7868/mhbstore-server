const Cart = require('./entity/model');

// Add item to cart
exports.addItemToCart = async (userId, productId, qty, color, size, meter) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].qty += qty;
  } else {
    const newItem = { productId, qty, selectedColor: color, selectedSize: size, selectedMeter: meter };
    cart.items.push(newItem);
  }

  await cart.save();
  return cart;
};

// Remove item from cart
exports.removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  );
  return cart;
};

// Update item quantity
exports.updateItemQuantity = async (userId, productId, qty) => {
  const cart = await Cart.findOne({ userId });
  if (cart) {
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());
    if (itemIndex >= 0) {
      cart.items[itemIndex].qty = qty;
      await cart.save();
    }
  }
  return cart;
};

// Clear cart
exports.clearCart = async (userId) => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );
  return cart;
};
