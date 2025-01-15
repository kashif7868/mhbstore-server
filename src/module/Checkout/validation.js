const Joi = require('joi');

const placeOrderValidation = Joi.object({
  orderId: Joi.string().required(),
  userDetails: Joi.object({
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().email().optional(),
    country: Joi.string().default('Pakistan'),
    province: Joi.string().default('Punjab'),
    city: Joi.string().required(),
    postalCode: Joi.string().optional(),
    apartment: Joi.string().optional(),
    address: Joi.string().required(),
    specialNotes: Joi.string().optional(),
    shipToDifferentAddress: Joi.boolean().default(false),
    deliveryAddress: Joi.string().optional(),
  }).required(),
  cart: Joi.array().items(
    Joi.object({
      productCode: Joi.string().required(),
      productName: Joi.string().optional(),
      salePrice: Joi.number().optional(),
      price: Joi.number().optional(),
      qty: Joi.number().default(1),
      selectedColor: Joi.string().optional(),
      selectedSize: Joi.string().optional(),
      selectedMeter: Joi.string().optional(),
      images: Joi.array().items(Joi.string()).optional(),
    })
  ).required(),
  paymentMethod: Joi.string().valid('bank', 'cashOnDelivery').required(),
  subtotal: Joi.number().required(),
  deliveryCharges: Joi.number().default(0),
  grandTotal: Joi.number().required(),
}).required();

const updateOrderStatusValidation = Joi.object({
  status: Joi.string().valid('Pending', 'Confirmed', 'Shipped', 'Cancelled', 'Completed').required(),
}).required();

module.exports = { placeOrderValidation, updateOrderStatusValidation };
