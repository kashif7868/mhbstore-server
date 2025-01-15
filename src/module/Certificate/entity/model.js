const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the path to the image file
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Certification = mongoose.model('Certification', certificationSchema);

module.exports = Certification;
