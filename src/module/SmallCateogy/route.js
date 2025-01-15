const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { createSmallCategoryValidation, updateSmallCategoryValidation } = require('./validation');
const smallCategoryController = require('./controller');

// Create SmallCategory
router.post(
  '/',
  validate(createSmallCategoryValidation), // Validate the request body for creating a SmallCategory
  smallCategoryController.createSmallCategory // Controller to create a SmallCategory
);

// Get all SmallCategories
router.get('/', smallCategoryController.getSmallCategories); // Controller to fetch all SmallCategories

// Get SmallCategory by ID
router.get('/:id', smallCategoryController.getSmallCategoryById); // Controller to fetch SmallCategory by ID

// Update SmallCategory
router.patch(
  '/:id',
  validate(updateSmallCategoryValidation), // Validate the request body for updating a SmallCategory
  smallCategoryController.updateSmallCategory // Controller to update a SmallCategory
);

// Delete SmallCategory
router.delete('/:id', smallCategoryController.deleteSmallCategory); // Controller to delete a SmallCategory

module.exports = {
  smallCategoryRoutes: router, // Export the router to be used in other parts of the application
};
