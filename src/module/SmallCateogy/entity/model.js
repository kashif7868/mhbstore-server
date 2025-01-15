// Define the SmallCategory schema
const mongoose = require("mongoose");

const smallCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String, // Category name
      required: true,
    },
    sub_categoryName: {
      type: String, // Single sub-category name
      required: true,
    },
    small_categoryNames: {
      type: String, 
      required: true
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the SmallCategory model
const SmallCategory = mongoose.model("SmallCategory", smallCategorySchema);

module.exports = SmallCategory;
