const SubCategory = require('./entity/model');

// Service to create a SubCategory
const createSubCategory = async (data) => {
  return await SubCategory.create(data);
};

// Service to get all SubCategories
const getAllSubCategories = async () => {
  return await SubCategory.find();
};

// Service to get a SubCategory by ID
const getSubCategoryById = async (id) => {
  return await SubCategory.findById(id);
};

// Service to update a SubCategory
const updateSubCategory = async (id, data) => {
  return await SubCategory.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Service to delete a SubCategory
const deleteSubCategory = async (id) => {
  return await SubCategory.findByIdAndDelete(id);
};

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
