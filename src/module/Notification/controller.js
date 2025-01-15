const NotificationService = require('./service');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = await NotificationService.createNotification(req.body);
    return res.status(201).json(notification);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationService.getAllNotifications();
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a notification by ID
exports.getNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await NotificationService.getNotificationById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a notification by ID
exports.updateNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNotification = await NotificationService.updateNotification(id, req.body);
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    return res.status(200).json(updatedNotification);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNotification = await NotificationService.deleteNotification(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
