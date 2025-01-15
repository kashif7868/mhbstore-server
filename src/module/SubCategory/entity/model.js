const mongoose = require('mongoose');

// SubCategory Schema with the parent category reference
const subCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  sub_categoryName: { type: String, required: true },
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
