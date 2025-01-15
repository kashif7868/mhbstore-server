const express = require('express');
const router = express.Router();
const PartnershipController = require('./controller');
const { fileUpload } = require("../../utils/fileUpload");
const validate = require("../../middlewares/validate");
const validation = require('./validation');

// Route for creating a new partner and getting all partners
router
  .route("/")
  .post(
    fileUpload.fields([  // Handle multiple file uploads
      { name: 'partnerImage', maxCount: 1 },   // Single image for partner
      { name: 'productImages', maxCount: 10 }  // Multiple images for product (up to 10)
    ]),
    validate(validation.createPartner),  // Validate the request body for creating a partner
    PartnershipController.createPartner  // Controller to handle partner creation
  )
  .get(PartnershipController.getAllPartners);  // Controller to get all partners

// Route for getting, updating, and deleting a partner by ID
router
  .route("/:patnerId")
  .get(PartnershipController.getPartnerById)  // Get partner by ID
  .patch(
    fileUpload.fields([  // Handle multiple file uploads for update
      { name: 'partnerImage', maxCount: 1 },   
      { name: 'productImages', maxCount: 10 }
    ]),
    validate(validation.updatePartner),  // Validate the update request body
    PartnershipController.updatePartner  // Controller to update partner
  )
  .delete(PartnershipController.deletePartner);  // Controller to delete a partner

module.exports = {
  partnershipRoutes: router,  // Export the router for use in other parts of the application
};
