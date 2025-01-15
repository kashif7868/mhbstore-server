const { body, param } = require('express-validator');

// Validation for Sign-Up Bonus
exports.validateSignUpBonus = [
  body('userId').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID format'),
];

// Validation for Shopping Bonus
exports.validateShoppingBonus = [
  body('userId').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID format'),
  body('spentAmount').notEmpty().withMessage('Spent amount is required').isNumeric().withMessage('Spent amount must be a number'),
];

// Validation for Redemption
exports.validateRedemption = [
  body('userId').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID format'),
  body('redeemAmount').notEmpty().withMessage('Redeem amount is required').isNumeric().withMessage('Redeem amount must be a number'),
];

// Validation for getting Peerals details
exports.validateGetPeeralsDetails = [
  param('userId').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID format'),
];
