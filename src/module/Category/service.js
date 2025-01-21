const Category = require('./model');

const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

const updateCategory = async (categoryId, categoryData) => {
  const category = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

const getCategories = async ({ page, limit }) => {
  const options = {
    page: page || 1,
    limit: limit || 10,
  };
  return await Category.paginate({}, options);
};

const deleteCategory = async (categoryId) => {
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getCategoryById,
  getCategories,
  deleteCategory,
};
