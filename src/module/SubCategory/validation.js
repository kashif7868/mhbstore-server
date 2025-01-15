const Joi = require('joi');

// Validation for creating a SubCategory
const createSubCategoryValidation = {
  body: Joi.object({
    categoryName: Joi.string().required().messages({
      'string.empty': 'Category name is required',
    }),
    sub_categoryName: Joi.string().required().messages({
      'string.empty': 'SubCategory name is required',
    }),
  }),
};

// Validation for updating a SubCategory
const updateSubCategoryValidation = {
  body: Joi.object({
    categoryName: Joi.string().optional(),
    sub_categoryName: Joi.string().optional(),
  }),
};

module.exports = {
  createSubCategoryValidation,
  updateSubCategoryValidation,
};
