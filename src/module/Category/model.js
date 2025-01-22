const mongoose = require('mongoose');
const { toJSON, paginate } = require("../../utils/plugins");

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    backgroundColor: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['published', 'unpublished'], // Only allows 'published' or 'unpublished'
      required: true, 
      default: 'unpublished'  // Default status is 'unpublished'
    },
    image: { type: String, required: false }, // Optional image field
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Apply the plugins to the schema
categorySchema.plugin(toJSON);  // Apply the toJSON plugin for custom JSON serialization
categorySchema.plugin(paginate);  // Apply the paginate plugin for pagination support

// Define the model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
