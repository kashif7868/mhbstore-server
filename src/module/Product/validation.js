const Joi = require('joi');

// Validation schema for creating a product
const createProductValidation = Joi.object({
    ratings: Joi.number().required(),
    isFeatured: Joi.boolean().default(false),
    size: Joi.string().default('none'),
    weight: Joi.number().required(),
    images: Joi.array().items(Joi.string()).required(),  // Images are required
    published: Joi.boolean().default(false),
    productName: Joi.string().required(),
    description: Joi.string().required(),
    categoryName: Joi.string().required(),
    sub_categoryName: Joi.string().required(),
    small_categoryNames: Joi.string().required(),
    productCode: Joi.string().required(),
    price: Joi.number().required(),
    oldPrice: Joi.number().required(),
    productStock: Joi.number().required(),
    brand: Joi.string().default('none'),
    productDate: Joi.date().default(Date.now),
    discount: Joi.number().optional().min(0).max(100)  // Discount field: optional, between 0 and 100
});

// Validation schema for updating a product
const updateProductValidation = Joi.object({
    ratings: Joi.number().optional(),
    isFeatured: Joi.boolean().optional(),
    size: Joi.string().optional().default('none'),
    weight: Joi.number().optional(),
    images: Joi.array().items(Joi.string()).required(),  // Images are required
    published: Joi.boolean().optional(),
    productName: Joi.string().optional(),
    description: Joi.string().optional(),
    categoryName: Joi.string().optional(),
    sub_categoryName: Joi.string().optional(),
    small_categoryNames: Joi.string().optional(),
    productCode: Joi.string().optional(),
    price: Joi.number().optional(),
    oldPrice: Joi.number().optional(),
    productStock: Joi.number().optional(),
    brand: Joi.string().optional().default('none'),
    productDate: Joi.date().optional().default(Date.now),
    discount: Joi.number().optional().min(0).max(100)  // Discount field: optional, between 0 and 100
});

module.exports = {
    createProductValidation,
    updateProductValidation
};