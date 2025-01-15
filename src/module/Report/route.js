const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');  // Assuming you have a validate middleware
const controller = require('./controller');  // Your controller
const { validateUpdate } = require('./validation');  // Validation method for updating report

// Get all reports
router.get('/', controller.getReports);

// Update a report (validate the incoming data before passing to controller)
router.post('/', validate(validateUpdate), controller.updateReport);

module.exports = {
  reportRoutes: router,  // Export the router object for use elsewhere
};
