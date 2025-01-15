// Category/validation.js
const Joi = require('joi');

const createCategoryValidation = Joi.object({
  categoryName: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Category name should be a string.',
    'string.min': 'Category name should be at least 3 characters long.',
    'any.required': 'Category name is required.'
  }),
  backgroundColor: Joi.string().min(7).max(7).regex(/^#[0-9A-F]{6}$/i).required().messages({
    'string.base': 'Background color should be a string.',
    'string.pattern.base': 'Background color must be a valid hex code (e.g. #FF5733).',
    'any.required': 'Background color is required.'
  }),
  status: Joi.string().valid('published', 'unpublished').required().messages({
    'string.base': 'Status should be a string.',
    'any.only': 'Status must be either "published" or "unpublished".',
    'any.required': 'Status is required.'
  }),
  image: Joi.string().required().messages({
    'string.base': 'Image path should be a string.',
    'any.required': 'Image file is required.'
  })
});

const updateCategoryValidation = Joi.object({
  categoryName: Joi.string().min(3).max(50).optional().messages({
    'string.base': 'Category name should be a string.',
    'string.min': 'Category name should be at least 3 characters long.'
  }),
  backgroundColor: Joi.string().min(7).max(7).regex(/^#[0-9A-F]{6}$/i).optional().messages({
    'string.base': 'Background color should be a string.',
    'string.pattern.base': 'Background color must be a valid hex code (e.g. #FF5733).'
  }),
  status: Joi.string().valid('published', 'unpublished').optional().messages({
    'string.base': 'Status should be a string.',
    'any.only': 'Status must be either "published" or "unpublished".'
  }),
  image: Joi.string().optional().messages({
    'string.base': 'Image path should be a string.'
  })
});

module.exports = { createCategoryValidation, updateCategoryValidation };
