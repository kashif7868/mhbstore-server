const { body } = require('express-validator');

// Validate adding an item to the cart
exports.addItemValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('userId').notEmpty().withMessage('User ID is required'),
];

// Validate updating item quantity
exports.updateItemValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('userId').notEmpty().withMessage('User ID is required'),
];
