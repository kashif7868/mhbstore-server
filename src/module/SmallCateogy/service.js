const SmallCategory = require('./entity/model');

// Create SmallCategory
exports.createSmallCategory = async (data) => {
  try {
    const smallCategory = await SmallCategory.create(data);
    return smallCategory;
  } catch (error) {
    throw new Error(error.message); // Throw error to handle in controller
  }
};

// Get all SmallCategories
exports.getSmallCategories = async () => {
  try {
    return await SmallCategory.find(); // Return all SmallCategories
  } catch (error) {
    throw new Error(error.message); // Throw error to handle in controller
  }
};

// Get SmallCategory by ID
exports.getSmallCategoryById = async (id) => {
  try {
    return await SmallCategory.findById(id); // Find SmallCategory by ID
  } catch (error) {
    throw new Error(error.message); // Throw error to handle in controller
  }
};

// Update SmallCategory
exports.updateSmallCategory = async (id, data) => {
  try {
    return await SmallCategory.findByIdAndUpdate(id, data, { new: true }); // Update and return the updated document
  } catch (error) {
    throw new Error(error.message); // Throw error to handle in controller
  }
};

// Delete SmallCategory
exports.deleteSmallCategory = async (id) => {
  try {
    const deleted = await SmallCategory.findByIdAndDelete(id); // Delete SmallCategory by ID
    return deleted; // Return the deleted document
  } catch (error) {
    throw new Error(error.message); // Throw error to handle in controller
  }
};
