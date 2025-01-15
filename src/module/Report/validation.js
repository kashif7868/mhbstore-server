const Joi = require('joi');

// Define validation schema for report data
const reportValidationSchema = Joi.object({
  userId: Joi.string().required(),
  totalOrders: Joi.number().required(),
  sales: Joi.object({
    weekly: Joi.number().required(),
    monthly: Joi.number().required(),
    yearly: Joi.number().required(),
  }).required(),
  orders: Joi.object({
    weekly: Joi.number().required(),
    monthly: Joi.number().required(),
    yearly: Joi.number().required(),
  }).required(),
  totalUsers: Joi.number().required(),
  overallIncome: Joi.number().required(),
  totalProductsSold: Joi.number().required(),
  totalCategories: Joi.number().required(),
  discountsApplied: Joi.number().required(),
});

// Validation function
const validateUpdate = (data) => {
  const { error } = reportValidationSchema.validate(data);  // Validate against the schema
  if (error) {
    throw new Error(error.details[0].message);  // If validation fails, throw an error with message
  }
};

module.exports = {
  validateUpdate,
};
