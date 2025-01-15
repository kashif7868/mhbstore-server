const express = require('express');
const router = express.Router();
const NotificationController = require('./controller');
const { createNotificationValidation, updateNotificationValidation } = require('./validation');
const validate = require('../../middlewares/validate');

// Add a new notification
router.post('/create', 
  validate(createNotificationValidation), // Validate request body for creating a notification
  NotificationController.createNotification // Controller function to create the notification
);

// Get all notifications
router.get('/', NotificationController.getAllNotifications);

// Get a notification by ID
router.get('/:id', NotificationController.getNotificationById);

// Update an existing notification
router.patch('/:id', 
  validate(updateNotificationValidation), // Validate request body for updating a notification
  NotificationController.updateNotification // Controller function to update the notification
);

// Delete an existing notification
router.delete('/:id', NotificationController.deleteNotification);

// Export the router
module.exports = {
  notificationRoutes: router, // Export the router object for use elsewhere
};
