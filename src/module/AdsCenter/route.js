const express = require("express");
const validate = require("../../middlewares/validate");
const controller = require("./controller");
const validation = require("./validation");
const { fileUpload } = require("../../utils/fileUpload");

const router = express.Router();

// Route for creating and fetching all ad images
router
  .route("/")
  .post(
    fileUpload.array("images"), // Handles file upload with 'images' as the field name
    validate(validation.createAdImageValidation), // Validate the request body for ad image creation
    controller.createAdImage // Controller to create the ad image
  )
  .get(controller.getAllAdImages); // Controller to fetch all ad images

// Route for getting, updating, and deleting an ad image by ID
router
  .route("/:adImageId") // Use 'adImageId' to identify the ad image
  .get(
    validate(validation.getAdImageValidation), // Validate the request parameters for getting an ad image
    controller.getAdImageById // Controller to fetch a single ad image by ID
  )
  .patch(
    fileUpload.array("images"), // Handles file upload for ad image update (supports multiple files)
    validate(validation.updateAdImageValidation), // Validate the update request body
    controller.updateAdImage // Controller to update the ad image
  )
  .delete(
    validate(validation.deleteAdImageValidation), // Validate the delete request
    controller.deleteAdImage // Controller to delete the ad image
  );

module.exports = {
  adsCenterRoutes: router, // Export the routes for use in other parts of the application
};
