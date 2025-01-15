const Joi = require('joi');

// Define validation schema for creating a product
exports.createProductValidation = (req, res, next) => {
  const schema = Joi.object({
    productName: Joi.string().required(),
    description: Joi.string().required(),
    categoryName: Joi.string().required(),
    sub_categoryName: Joi.string().required(),
    small_categoryName: Joi.string().required(),
    price: Joi.number().required(),
    oldPrice: Joi.number().required(),
    productStock: Joi.number().required(),
    brand: Joi.string().required(),
    ratings: Joi.number().min(0).max(5).default(0),
    isFeatured: Joi.boolean().default(false),
    colors: Joi.string().default('#000000'),
    size: Joi.string().valid('none', 'small', 'medium', 'large', 'x-large', 'double-large').default('none'),
    weight: Joi.number().default(0),
    meter: Joi.number().default(0),
    productDate: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
