const subCategoryService = require('./service');

// Create a SubCategory
const createSubCategory = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging log
    const subCategory = await subCategoryService.createSubCategory(req.body);
    res.status(201).json({ message: 'SubCategory created successfully', subCategory });
  } catch (error) {
    console.error('Error in createSubCategory:', error); // Capture detailed error
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get all SubCategories
const getSubCategories = async (req, res) => {
  try {
    const subCategories = await subCategoryService.getAllSubCategories();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get SubCategory by ID
const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await subCategoryService.getSubCategoryById(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update SubCategory
const updateSubCategory = async (req, res) => {
  try {
    const updatedSubCategory = await subCategoryService.updateSubCategory(req.params.id, req.body);
    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    res.status(200).json({ message: 'SubCategory updated successfully', updatedSubCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete SubCategory
const deleteSubCategory = async (req, res) => {
  try {
    const deletedSubCategory = await subCategoryService.deleteSubCategory(req.params.id);
    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    res.status(200).json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
