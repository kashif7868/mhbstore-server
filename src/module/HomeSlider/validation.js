const Joi = require('joi'); // We will use Joi for validation

// Validation for creating a banner
const createBannerValidation = Joi.object({
  status: Joi.string().valid('active', 'inactive', 'archived').default('active'),
  images: Joi.array().items(Joi.string()).required(), // Images field is required
});

// Validation for updating a banner
const updateBannerValidation = Joi.object({
  status: Joi.string().valid('active', 'inactive', 'archived'),
  images: Joi.array().items(Joi.string()),
}).min(1); // At least one field must be updated

// Validation for fetching a banner by ID
const getBannerValidation = Joi.object({
  bannerId: Joi.string().length(24).hex().required(), // Ensures it's a valid ObjectId format
});

// Validation for deleting a banner
const deleteBannerValidation = Joi.object({
  bannerId: Joi.string().length(24).hex().required(), // Ensures it's a valid ObjectId format
});

module.exports = {
  createBannerValidation,
  updateBannerValidation,
  getBannerValidation,
  deleteBannerValidation
};
