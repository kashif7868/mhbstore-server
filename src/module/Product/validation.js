const Joi = require('joi');

// Validation schema for creating a product
const createProductValidation = Joi.object({
    ratings: Joi.number().required().min(0).max(5), // Ratings should be between 0 and 5
    isFeatured: Joi.boolean().default(false),
    size: Joi.string().default('none'),
    kidsSize: Joi.string().default('none'),
    weight: Joi.string().valid('none', 'KG', 'Grams').default('none'), // Weight options updated to string with enum
    images: Joi.array().items(Joi.string()).required(),  // Images are required
    published: Joi.boolean().default(false),
    productName: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    categoryName: Joi.string().required().trim(),
    sub_categoryName: Joi.string().required().trim(),
    small_categoryNames: Joi.string().required().trim(),
    productCode: Joi.string().required().trim(),
    price: Joi.number().required().min(0),
    oldPrice: Joi.number().required().min(0),
    productStock: Joi.number().required().min(0),
    brand: Joi.string().default('none'),
    productDate: Joi.date().default(Date.now),
    discount: Joi.number().optional().min(0).max(100),  // Discount field: optional, between 0 and 100
});

// Validation schema for updating a product
const updateProductValidation = Joi.object({
    ratings: Joi.number().optional().min(0).max(5), // Ratings should be between 0 and 5
    isFeatured: Joi.boolean().optional(),
    colors: Joi.string().optional().default('none'),
    size: Joi.string().optional().default('none'),
    weight: Joi.string().valid('none', 'KG', 'Grams').optional().default('none'), // Weight options updated to string with enum
    images: Joi.array().items(Joi.string()).optional(),  // Images are optional during update
    published: Joi.boolean().optional(),
    productName: Joi.string().optional().trim(),
    description: Joi.string().optional().trim(),
    categoryName: Joi.string().optional().trim(),
    sub_categoryName: Joi.string().optional().trim(),
    small_categoryNames: Joi.string().optional().trim(),
    productCode: Joi.string().optional().trim(),
    price: Joi.number().optional().min(0),
    oldPrice: Joi.number().optional().min(0),
    productStock: Joi.number().optional().min(0),
    brand: Joi.string().optional().default('none'),
    productDate: Joi.date().optional().default(Date.now),
    discount: Joi.number().optional().min(0).max(100),  // Discount field: optional, between 0 and 100
});

module.exports = {
    createProductValidation,
    updateProductValidation
};
