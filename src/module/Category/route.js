// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { fileUpload } = require('../../utils/fileUpload');
const validate = require('../../middlewares/validate');
const { createCategoryValidation, updateCategoryValidation } = require('./validation');
const categoryController = require('./controller');

// Route to fetch all categories and create a category
router
  .route('/')
  .get(categoryController.getCategories) // Fetch all categories
  .post(fileUpload.single('image'), validate(createCategoryValidation), categoryController.createCategory); // Create category

// Route to fetch, update or delete a single category by ID
router
  .route('/:categoryId')
  .get(categoryController.getCategory) // Get a single category by ID
  .patch(fileUpload.single('image'), validate(updateCategoryValidation), categoryController.updateCategory) // Update category
  .delete(categoryController.deleteCategory); // Delete category

module.exports = {
  categoryRoutes: router,
};
