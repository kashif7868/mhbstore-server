const Joi = require("joi");

const createAdValidation = {
  body: Joi.object({
    image: Joi.required(), // Ensure 'image' is required
    link: Joi.string().uri().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    status: Joi.string().valid('Active', 'Inactive').required(), // Adding validation for 'status'
  }),
};

const updateAdValidation = {
  body: Joi.object({
    image: Joi.optional(), // Optional for updates if you are not updating the image
    link: Joi.string().uri(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    status: Joi.string().valid('Active', 'Inactive'),
  }),
};

module.exports = { createAdValidation, updateAdValidation };
