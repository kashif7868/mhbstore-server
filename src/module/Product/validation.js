const Joi = require('joi');

// Validation schema for creating a product
const createProductValidation = Joi.object({
  ratings: Joi.number().required().messages({
    'any.required': 'Ratings are required and must be a number.'
  }),
  isFeatured: Joi.boolean().default(false).messages({
    'boolean.base': 'isFeatured must be a boolean value.'
  }),
  size: Joi.string().default('none').messages({
    'string.base': 'Size must be a string.'
  }),
  weight: Joi.number().required().messages({
    'any.required': 'Weight is required and must be a number.'
  }),
  images: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Images are required and must be an array of strings.',
    'array.base': 'Images must be an array.'
  }),
  published: Joi.boolean().default(false).messages({
    'boolean.base': 'Published must be a boolean value.'
  }),
  productName: Joi.string().required().messages({
    'any.required': 'Product name is required.'
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required.'
  }),
  categoryName: Joi.string().required().messages({
    'any.required': 'Category name is required.'
  }),
  sub_categoryName: Joi.string().required().messages({
    'any.required': 'Sub-category name is required.'
  }),
  small_categoryNames: Joi.string().required().messages({
    'any.required': 'Small category names are required.'
  }),
  productCode: Joi.string().required().messages({
    'any.required': 'Product code is required.'
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required and must be a number.'
  }),
  oldPrice: Joi.number().required().messages({
    'any.required': 'Old price is required and must be a number.'
  }),
  productStock: Joi.number().required().messages({
    'any.required': 'Product stock is required and must be a number.'
  }),
  brand: Joi.string().default('none').messages({
    'string.base': 'Brand must be a string.'
  }),
  productDate: Joi.date().default(Date.now).messages({
    'date.base': 'Product date must be a valid date.'
  }),
  discount: Joi.number().optional().min(0).max(100).messages({
    'number.min': 'Discount must be at least 0.',
    'number.max': 'Discount must not exceed 100.'
  })
});

// Validation schema for updating a product
const updateProductValidation = Joi.object({
  ratings: Joi.number().optional().messages({
    'number.base': 'Ratings must be a number.'
  }),
  isFeatured: Joi.boolean().optional().messages({
    'boolean.base': 'isFeatured must be a boolean value.'
  }),
  size: Joi.string().optional().default('none').messages({
    'string.base': 'Size must be a string.'
  }),
  weight: Joi.number().optional().messages({
    'number.base': 'Weight must be a number.'
  }),
  images: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Images are required and must be an array of strings.',
    'array.base': 'Images must be an array.'
  }),
  published: Joi.boolean().optional().messages({
    'boolean.base': 'Published must be a boolean value.'
  }),
  productName: Joi.string().optional().messages({
    'string.base': 'Product name must be a string.'
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description must be a string.'
  }),
  categoryName: Joi.string().optional().messages({
    'string.base': 'Category name must be a string.'
  }),
  sub_categoryName: Joi.string().optional().messages({
    'string.base': 'Sub-category name must be a string.'
  }),
  small_categoryNames: Joi.string().optional().messages({
    'string.base': 'Small category names must be a string.'
  }),
  productCode: Joi.string().optional().messages({
    'string.base': 'Product code must be a string.'
  }),
  price: Joi.number().optional().messages({
    'number.base': 'Price must be a number.'
  }),
  oldPrice: Joi.number().optional().messages({
    'number.base': 'Old price must be a number.'
  }),
  productStock: Joi.number().optional().messages({
    'number.base': 'Product stock must be a number.'
  }),
  brand: Joi.string().optional().default('none').messages({
    'string.base': 'Brand must be a string.'
  }),
  productDate: Joi.date().optional().default(Date.now).messages({
    'date.base': 'Product date must be a valid date.'
  }),
  discount: Joi.number().optional().min(0).max(100).messages({
    'number.min': 'Discount must be at least 0.',
    'number.max': 'Discount must not exceed 100.'
  })
});

module.exports = { createProductValidation, updateProductValidation };
