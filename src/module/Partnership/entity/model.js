const mongoose = require('mongoose');

const partnershipSchema = new mongoose.Schema({
  partnerImage: { type: String, required: true }, // Added required partner image
  partnerName: { type: String, required: true },
  partnerPhoneNumber: { type: String, required: true },
  partnerEmail: { type: String, required: true },
  partnerAddress: { type: String, required: true },
  productName: { type: String, required: true },
  productDetails: { type: String, required: true },
  productStock: { type: Number, required: true },
  productImages: [{ type: String }], // Multiple product images (optional)
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

const Partnership = mongoose.model('Partnership', partnershipSchema);
module.exports = Partnership;
