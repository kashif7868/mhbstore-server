const mongoose = require('mongoose');

// Cart item schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  qty: { type: Number, default: 1 },
  selectedColor: { type: String },
  selectedSize: { type: String },
  selectedMeter: { type: Number },
  ratings: { type: Number, default: 0 },
  description: { type: String },
  images: [String],
});

// Cart schema
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  peerals: { type: Number, default: 0 }, // Peerals discount
  createdAt: { type: Date, default: Date.now },
});

// Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
