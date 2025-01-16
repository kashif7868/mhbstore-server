const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    ratings: {
      type: Number,
      required: [true, 'Ratings are required'],
      min: [0, 'Ratings cannot be negative'],
      max: [5, 'Ratings cannot be more than 5'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "none",
    },
    weight: {
      type: String,
      default: "none",
      enum: ["none", "KG", "Grams"],
    },
    images: [
      {
        type: String,
        required: [true, 'At least one image is required'],
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    categoryName: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    sub_categoryName: {
      type: String,
      required: [true, 'Sub-category name is required'],
      trim: true,
    },
    small_categoryNames: {
      type: String,
      required: [true, 'Small category names are required'],
      trim: true,
    },
    productCode: {
      type: String,
      required: [true, 'Product code is required'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    oldPrice: {
      type: Number,
      required: [true, 'Old price is required'],
      min: [0, 'Old price cannot be negative'],
    },
    productStock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: [0, 'Stock cannot be negative'],
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
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot be more than 100%'],
    },
  },
  { timestamps: true }
);

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
