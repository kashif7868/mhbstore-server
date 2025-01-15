const SmallCategoryService = require('./service');

// Create SmallCategory
exports.createSmallCategory = async (req, res) => {
  try {
    const smallCategory = await SmallCategoryService.createSmallCategory(req.body);
    res.status(201).json(smallCategory); // Created successfully
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ error: error.message }); // Internal server error
  }
};

// Get all SmallCategories
exports.getSmallCategories = async (req, res) => {
  try {
    const smallCategories = await SmallCategoryService.getSmallCategories();
    res.status(200).json(smallCategories); // Success response
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ error: error.message }); // Internal server error
  }
};

// Get SmallCategory by ID
exports.getSmallCategoryById = async (req, res) => {
  try {
    const smallCategory = await SmallCategoryService.getSmallCategoryById(req.params.id);
    if (!smallCategory) {
      return res.status(404).json({ error: 'SmallCategory not found' }); // Not found error
    }
    res.status(200).json(smallCategory); // Success response
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ error: error.message }); // Internal server error
  }
};

// Update SmallCategory
exports.updateSmallCategory = async (req, res) => {
  try {
    const smallCategory = await SmallCategoryService.updateSmallCategory(req.params.id, req.body);
    if (!smallCategory) {
      return res.status(404).json({ error: 'SmallCategory not found' }); // Not found error
    }
    res.status(200).json(smallCategory); // Success response
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ error: error.message }); // Internal server error
  }
};

// Delete SmallCategory
exports.deleteSmallCategory = async (req, res) => {
  try {
    const deleted = await SmallCategoryService.deleteSmallCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'SmallCategory not found' }); // Not found error
    }
    res.status(200).json({ message: 'SmallCategory deleted successfully' }); // Success response
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ error: error.message }); // Internal server error
  }
};
