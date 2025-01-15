const express = require("express");
const router = express.Router();
const { fileUpload } = require("../../utils/fileUpload"); // File upload middleware
const controller = require("./controller");
const validate = require("../../middlewares/validate");
const {
  createProductValidation,
  updateProductValidation,
} = require("./validation"); // Make sure this file exists and exports the validation functions

// Create product route
router
  .route("/")
  .post(
    fileUpload.array("images"), // Handles file upload with 'image' as the field name
    validate(createProductValidation), // Validate the request body for image creation
    controller.createProduct // Controller to create the slider image
  )
  .get(controller.getAllProducts); // Get all products route

// Get product by ID route
router.get("/:productId", controller.getProductById);

// Update product route
router.patch(
  "/:productId", // Ensure the productId is passed as a parameter for the update
  fileUpload.array("images"), // Handle file upload for image update
  validate(updateProductValidation), // Validate the update request body
  controller.updateProduct // Controller to update the slider image
);

// Delete product route
router.delete("/:productId", controller.deleteProduct);

module.exports = { productsRoutes: router };
