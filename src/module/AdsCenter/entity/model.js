const mongoose = require("mongoose");

const adsImageSchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  sub_categoryName: { type: String, required: true },
  small_categoryNames: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive", "archived"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Adding pre-save middleware to update the `updatedAt` field before saving
adsImageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Creating the model based on the updated adsImageSchema
const AdsImage = mongoose.model("AdsImage", adsImageSchema);

module.exports = AdsImage;
