const express = require('express');
const router = express.Router();
const validate = require("../../middlewares/validate");
const { createAdValidation, updateAdValidation } = require("./validation");
const adsController = require("./controller");
const { fileUpload } = require('../../utils/fileUpload');

// Route for creating a new ad (POST)
router
  .route("/")
  .post(
    fileUpload.single("image"),  // Handle file upload before validation
    validate(createAdValidation),  // Validation middleware after file upload
    adsController.createAd       // Controller to handle the request
  )
  .get(adsController.getAllAds);    // Route to get all active ads (GET)

// Route for getting, updating, and deleting an ad by ID (GET, PATCH, DELETE)
router
  .route("/:id")
  .get(adsController.getAdById)   // Get ad by ID
  .patch(
    fileUpload.single("image"),  // Handle file upload before validation (optional for update)
    validate(updateAdValidation), // Validation middleware after file upload
    adsController.updateAd       // Controller to update ad
  )
  .delete(adsController.deleteAd); // Delete ad by ID

// If you want to export the router, this export structure should work:
module.exports.adsCenterRoutes = router;
