const mongoose = require('mongoose');

const sliderImageSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Image URL or filename
  altText: { type: String, required: true }, // Alt text for accessibility
  createdAt: { type: Date, default: Date.now } // Created timestamp
});

const SliderImage = mongoose.model('SliderImage', sliderImageSchema);

module.exports = SliderImage;