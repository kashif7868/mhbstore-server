const Joi = require('joi');

exports.createSmallCategoryValidation = {
  body: Joi.object({
    categoryName: Joi.string().required(),
    sub_categoryName: Joi.string().required(),
    small_categoryNames: Joi.string().required(),
  }),
};

exports.updateSmallCategoryValidation = {
  body: Joi.object({
    categoryName: Joi.string(),
    sub_categoryName: Joi.string(),
    small_categoryNames: Joi.string(),
  }),
};
