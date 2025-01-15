// route.js
const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const { placeOrderValidation, updateOrderStatusValidation } = require("./validation");
const checkoutController = require("./controller");
const { fileUpload } = require("../../utils/fileUpload");

// Route to place an order (with file uploads)
router.post(
  "/",
  fileUpload.array("images"),
  validate(placeOrderValidation),
  checkoutController.placeOrder
);

// Route to get all orders
router.get("/", checkoutController.getAllOrders);

// Route to get an order by ID
router.get("/:orderId", checkoutController.getOrderById);

// Route to update order status
router.patch(
  "/:orderId/status",
  validate(updateOrderStatusValidation),
  checkoutController.updateOrderStatus
);

// Route to delete an order
router.delete("/:orderId", checkoutController.deleteOrder);

module.exports = { checkoutRoutes: router };
