const mongoose = require("mongoose");

const bannerImageSchema = new mongoose.Schema({
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

bannerImageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const BannerImage = mongoose.model("BannerImage", bannerImageSchema);

module.exports = BannerImage; // Exporting the model
