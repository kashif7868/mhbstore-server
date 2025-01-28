const Joi = require('joi'); // We will use Joi for validation

// Validation for creating an ad image
const createAdImageValidation = Joi.object({
  categoryName: Joi.string().required(),
  sub_categoryName: Joi.string().required(),
  small_categoryNames: Joi.string().required(), // Changed to a string (as per model update)
  status: Joi.string().valid('active', 'inactive', 'archived').default('active'),
  images: Joi.array().items(Joi.string()).required(),
});

// Validation for updating an ad image
const updateAdImageValidation = Joi.object({
  categoryName: Joi.string(),
  sub_categoryName: Joi.string(),
  small_categoryNames: Joi.string(), // Changed to string for consistency with the model
  status: Joi.string().valid('active', 'inactive', 'archived'),
  images: Joi.array().items(Joi.string()),
}).min(1); // At least one field must be updated

// Validation for fetching an ad image by ID
const getAdImageValidation = Joi.object({
  adImageId: Joi.string().length(24).hex().required(), // Ensures it's a valid ObjectId format
});

// Validation for deleting an ad image
const deleteAdImageValidation = Joi.object({
  adImageId: Joi.string().length(24).hex().required(), // Ensures it's a valid ObjectId format
});

module.exports = {
  createAdImageValidation,
  updateAdImageValidation,
  getAdImageValidation,
  deleteAdImageValidation
};
