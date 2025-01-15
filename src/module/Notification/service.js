const Notification = require('./entity/model');

exports.createNotification = async (notificationData) => {
  try {
    const notification = new Notification(notificationData);
    return await notification.save();
  } catch (error) {
    throw new Error('Error creating notification: ' + error.message);
  }
};

exports.getAllNotifications = async () => {
  try {
    return await Notification.find();
  } catch (error) {
    throw new Error('Error fetching notifications: ' + error.message);
  }
};

exports.getNotificationById = async (id) => {
  try {
    return await Notification.findById(id);
  } catch (error) {
    throw new Error('Error fetching notification by ID: ' + error.message);
  }
};

exports.updateNotification = async (id, updateData) => {
  try {
    return await Notification.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating notification: ' + error.message);
  }
};

exports.deleteNotification = async (id) => {
  try {
    return await Notification.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting notification: ' + error.message);
  }
};
