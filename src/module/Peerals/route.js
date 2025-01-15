const express = require('express');
const router = express.Router();
const PeeralsController = require('./controller');
const { 
  validateSignUpBonus, 
  validateShoppingBonus, 
  validateRedemption, 
  validateGetPeeralsDetails 
} = require('./validation');
const validate = require('../../middlewares/validate');

// Define your routes
router.post('/signup-bonus', 
  validateSignUpBonus,  // Validate request for sign up bonus
  validate,             // General validation middleware
  PeeralsController.addSignUpBonus // Controller to add sign up bonus
);

router.post('/shopping-bonus', 
  validateShoppingBonus,  // Validate request for shopping bonus
  validate,               // General validation middleware
  PeeralsController.addShoppingBonus // Controller to add shopping bonus
);

router.post('/redeem', 
  validateRedemption,  // Validate request for redeeming peerals
  validate,            // General validation middleware
  PeeralsController.redeemPeerals // Controller to handle peerals redemption
);

router.get('/:userId', 
  validateGetPeeralsDetails,  // Validate request for peerals details
  validate,                   // General validation middleware
  PeeralsController.getPeeralsDetails // Controller to fetch peerals details for a user
);

module.exports = {
  peeralsRoutes: router // Export the router to use in other parts of the application
};
