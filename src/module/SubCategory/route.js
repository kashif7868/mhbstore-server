const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { createSubCategoryValidation, updateSubCategoryValidation } = require('./validation');
const subCategoryController = require('./controller');

// Create SubCategory
router.post(
  '/',
  validate(createSubCategoryValidation), // Validate the request body for creating a SubCategory
  subCategoryController.createSubCategory // Controller to create a SubCategory
);

// Get all SubCategories
router.get('/', subCategoryController.getSubCategories); // Controller to fetch all SubCategories

// Get SubCategory by ID
router.get('/:id', subCategoryController.getSubCategoryById); // Controller to fetch SubCategory by ID

// Update SubCategory
router.patch(
  '/:id',
  validate(updateSubCategoryValidation), // Validate the request body for updating a SubCategory
  subCategoryController.updateSubCategory // Controller to update a SubCategory
);

// Delete SubCategory
router.delete('/:id', subCategoryController.deleteSubCategory); // Controller to delete a SubCategory

module.exports = {
  subCategoryRoutes: router, // Export the router to be used in other parts of the application
};
