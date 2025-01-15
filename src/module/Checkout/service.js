// service.js
const Order = require("./entity/model");
const emailService = require("../emails/emailService");
const placeOrder = async (orderData, files) => {
  // If files are uploaded, attach the file paths
  if (files && files.length > 0) {
    orderData.cart.forEach((item) => {
      item.media = files.map(file => file.path);
    });
  }

  // Create a new order and save it to the database
  const newOrder = new Order(orderData);
  await newOrder.save();

  // Send the confirmation email after the order is placed
  await emailService.sendOrderConfirmationEmail(newOrder);

  return newOrder;
};

const getAllOrders = async () => {
  return await Order.find();
};

const getOrderById = async (orderId) => {
  return await Order.findOne({ orderId });
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findOne({ orderId });
  if (!order) return null;

  switch (status) {
    case "Pending":
      order.setStatusPending();
      break;
    case "Confirmed":
      order.setStatusConfirmed();
      break;
    case "Shipped":
      order.setStatusShipped();
      break;
    case "Cancelled":
      order.setStatusCancelled();
      break;
    case "Completed":
      order.setStatusCompleted();
      break;
    default:
      return null;
  }

  await order.save();
  return order;
};

const deleteOrder = async (orderId) => {
  const order = await Order.findOneAndDelete({ orderId });
  return order;
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
