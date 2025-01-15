const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
  image: { type: String, required: true },
  link: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

adsSchema.pre('save', function (next) {
  const now = new Date();
  if (this.startDate <= now && this.endDate >= now) {
    this.isActive = true;
  } else {
    this.isActive = false;
  }
  next();
});

const AdsCenter = mongoose.model('AdsCenter', adsSchema);
module.exports = AdsCenter;
