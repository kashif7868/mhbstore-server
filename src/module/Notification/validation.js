const Joi = require('joi');

// Validation schema for creating a notification
exports.createNotificationValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  message: Joi.string().required().min(10).max(500),
  status: Joi.string().valid('Sent', 'Unread', 'Read').optional(),
});

// Validation schema for updating a notification
exports.updateNotificationValidation = Joi.object({
  name: Joi.string().optional().min(3).max(50),
  email: Joi.string().email().optional(),
  message: Joi.string().optional().min(10).max(500),
  status: Joi.string().valid('Sent', 'Unread', 'Read').optional(),
});
