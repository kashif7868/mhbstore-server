const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema(
  {
    ratings: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: String,
      default: "none",
    },
    size: {
      type: String,
      default: "none",
    },
    kidsSize: {
      type: String,
      default: "none",
    },
    weight: {
      type: Number,
      required: true,
    },
    meter: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ], // Images are required
    published: {
      type: Boolean,
      default: false,
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    sub_categoryName: {
      type: String,
      required: true,
    },
    small_categoryNames: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    productStock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      default: "none",
    },
    productDate: {
      type: Date,
      default: Date.now,
    },
    discount: {
      // Discount field to store percentage discount
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Virtual field to calculate the discounted price
productSchema.virtual("discountedPrice").get(function () {
  if (this.discount > 0) {
    return this.price - this.price * (this.discount / 100);
  }
  return this.price;
});

// Create and export the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
