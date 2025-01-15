const express = require('express');
const router = express.Router();
const cartController = require('./controller');
const validate = require('../../middlewares/validate');
const { addItemValidation, updateItemValidation } = require('./validation');

// Add item to cart
router.post('/add', addItemValidation, cartController.addItem);

// Remove item from cart
router.delete('/remove/:productId/:userId', cartController.removeItem);

// Update item quantity in cart
router.put('/update', updateItemValidation, cartController.updateItemQuantity);

// Clear the cart
router.post('/clear', cartController.clearCart);

module.exports = { cartRoutes: router };
