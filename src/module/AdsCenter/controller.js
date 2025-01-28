const path = require("path");
const AdsImageService = require("./service"); // Import the AdsImage service

// Create a new ad image
const createAdImage = async (req, res) => {
  try {
    const { categoryName, sub_categoryName, small_categoryNames, status } = req.body;
    const images = req.files.map(file => path.join("uploads", file.filename)); // Process the uploaded files

    const adImageData = { categoryName, sub_categoryName, small_categoryNames, status, images };

    const newAdImage = await AdsImageService.createAdImage(adImageData);

    return res.status(201).json({
      message: "Ad image created successfully",
      adImage: newAdImage,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating ad image",
      error: err.message,
    });
  }
};

// Update an existing ad image by ID
const updateAdImage = async (req, res) => {
  try {
    const { adImageId } = req.params;
    const { categoryName, sub_categoryName, small_categoryNames, status } = req.body;

    // Handle image update if new files are provided
    let images = [];
    if (req.files) {
      images = req.files.map(file => path.join("uploads", file.filename)); // Update images with new uploads
    }

    const updateData = { categoryName, sub_categoryName, small_categoryNames, status, images };

    const updatedAdImage = await AdsImageService.updateAdImage(adImageId, updateData);

    return res.status(200).json({
      message: "Ad image updated successfully",
      adImage: updatedAdImage,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating ad image",
      error: err.message,
    });
  }
};

// Get all ad images
const getAllAdImages = async (req, res) => {
  try {
    const adImages = await AdsImageService.getAllAdImages();
    return res.status(200).json({
      adImages,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching ad images",
      error: err.message,
    });
  }
};

// Get a single ad image by ID
const getAdImageById = async (req, res) => {
  try {
    const { adImageId } = req.params;
    const adImage = await AdsImageService.getAdImageById(adImageId);
    return res.status(200).json({
      adImage,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching ad image",
      error: err.message,
    });
  }
};

// Delete an ad image by ID
const deleteAdImage = async (req, res) => {
  try {
    const { adImageId } = req.params;
    await AdsImageService.deleteAdImage(adImageId);
    return res.status(200).json({
      message: "Ad image deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting ad image",
      error: err.message,
    });
  }
};

module.exports = {
  createAdImage,
  updateAdImage,
  getAllAdImages,
  getAdImageById,
  deleteAdImage,
};
