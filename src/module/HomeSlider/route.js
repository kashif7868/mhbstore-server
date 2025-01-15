const express = require("express");
const validate = require("../../middlewares/validate");
const controller = require("./controller");
const validation = require("./validation");
const { fileUpload } = require("../../utils/fileUpload");

const router = express.Router();

// Route for creating and fetching all slider images
router
  .route("/")
  .post(
    fileUpload.single("image"), // Handles file upload with 'image' as the field name
    validate(validation.createSliderImage), // Validate the request body for image creation
    controller.createSliderImage // Controller to create the slider image
  )
  .get(controller.getAllSliderImages); // Controller to fetch all slider images

// Route for getting, updating, and deleting a slider image by ID
router
  .route("/:sliderId") // Use 'sliderId' to identify the image
  .get(
    validate(validation.getSliderImage), // Validate the request parameters for getting an image
    controller.getSliderImageById // Controller to fetch a single slider image by ID
  )
  .patch(
    fileUpload.single("image"), // Handle file upload for image update
    validate(validation.updateSliderImage), // Validate the update request body
    controller.updateSliderImage // Controller to update the slider image
  )
  .delete(
    validate(validation.deleteSliderImage), // Validate the delete request
    controller.deleteSliderImage // Controller to delete the slider image
  );

module.exports = {
  homeSliderRoutes: router, // Export the routes for use in other parts of the application
};
