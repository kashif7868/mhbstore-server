const express = require("express");
const validate = require("../../middlewares/validate");
const controller = require("./controller");
const validation = require("./validation");
const { fileUpload } = require("../../utils/fileUpload");

const router = express.Router();

// Route for creating and fetching all banners
router
  .route("/")
  .post(
    fileUpload.array("images"), // Handles file upload with 'image' as the field name
    validate(validation.createBannerValidation), // Validate the request body for banner creation
    controller.createBanner // Controller to create the banner
  )
  .get(controller.getAllBanner); // Controller to fetch all banners

// Route for getting, updating, and deleting a banner by ID
router
  .route("/:bannerId") // Use 'bannerId' to identify the banner
  .get(
    validate(validation.getBannerValidation), // Validate the request parameters for getting a banner
    controller.getBannerById // Controller to fetch a single banner by ID
  )
  .patch(
    fileUpload.array("images"), // Handles file upload for banner update (supports multiple files)
    validate(validation.updateBannerValidation), // Validate the update request body
    controller.updateBanner // Controller to update the banner
  )
  .delete(
    validate(validation.deleteBannerValidation), // Validate the delete request
    controller.deleteBanner // Controller to delete the banner
  );

module.exports = {
  BannerImageRoutes: router, // Export the routes for use in other parts of the application
};
