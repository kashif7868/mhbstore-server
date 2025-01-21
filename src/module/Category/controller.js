const path = require('path');
const catchAsync = require('../../utils/catchAsync');
const categoryService = require('./service');
const { uploadToFTP } = require('../../utils/fileUpload');  // Import the FTP upload function

const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;

  // Remove id if it exists in the incoming data
  delete categoryData._id;

  if (req.file) {
    try {
      // Upload file to FTP server
      const fileUrl = await uploadToFTP(req.file);
      categoryData.image = fileUrl; // Set the image URL from FTP
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `File upload failed: ${err.message}`,
      });
    }
  }

  const newCategory = await categoryService.createCategory(categoryData);
  res.status(201).json({
    success: true,
    data: newCategory,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const categoryData = req.body;

  // Check if image file is uploaded and update
  if (req.file) {
    try {
      // Upload file to FTP server
      const fileUrl = await uploadToFTP(req.file);
      categoryData.image = fileUrl; // Set the image URL from FTP
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `File upload failed: ${err.message}`,
      });
    }
  }

  // Ensure the category status is updated accordingly
  if (categoryData.status && !['published', 'unpublished'].includes(categoryData.status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value. It should be 'published' or 'unpublished'."
    });
  }

  const updatedCategory = await categoryService.updateCategory(categoryId, categoryData);
  res.status(200).json({
    success: true,
    data: updatedCategory,
  });
});

const getCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const category = await categoryService.getCategoryById(categoryId);
  res.status(200).json({
    success: true,
    data: category,
  });
});

const getCategories = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const categories = await categoryService.getCategories({ page, limit });
  res.status(200).json({
    success: true,
    data: categories,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  await categoryService.deleteCategory(categoryId);
  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  getCategories,
  deleteCategory,
};
