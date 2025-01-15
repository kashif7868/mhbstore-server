const express = require("express");
const validate = require("../../middlewares/validate");
const controller = require("./controller");
const validation = require("./validation");
const { fileUpload } = require("../../utils/fileUpload");

const router = express.Router();

// Route for creating a new certification and fetching all certifications
router
  .route("/")
  .post(
    fileUpload.single("image"), // Handle file upload with 'image' as the field name
    validate(validation.createCertification), // Validate the request body for creation
    controller.createCertification // Controller to create a new certification
  )
  .get(controller.getAllCertification); // Controller to fetch all certifications

// Route for getting, updating, and deleting certification by ID
router
  .route("/:certificationId") // Use 'certificationId' as the route parameter
  .get(
    validate(validation.getCertificationById), // Validate the request parameters for fetching certification
    controller.getCertificationById // Controller to fetch a specific certification by ID
  )
  .patch(
    fileUpload.single("image"), // Handle file upload for updates
    validate(validation.updateCertification), // Validate the update request body
    controller.updateCertification // Controller to update a certification
  )
  .delete(
    validate(validation.deleteCertification), // Validate the request for deleting a certification
    controller.deleteCertification // Controller to delete a certification
  );

module.exports = {
  certificateRoutes: router, // Export the routes for use in other parts of the application
};
