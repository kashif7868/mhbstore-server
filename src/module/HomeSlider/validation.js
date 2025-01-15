const Joi = require("joi");

const createSliderImage = Joi.object({
  altText: Joi.string().required().min(3).max(100).trim(),
});

const getSliderImage = Joi.object({
  sliderId: Joi.string().required(),
});

const updateSliderImage = Joi.object({
  altText: Joi.string().optional().min(3).max(100).trim(),
});

const deleteSliderImage = Joi.object({
  sliderId: Joi.string().required(),
});

module.exports = {
  createSliderImage,
  getSliderImage,
  updateSliderImage,
  deleteSliderImage,
};
