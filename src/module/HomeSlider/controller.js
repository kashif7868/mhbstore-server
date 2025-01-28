const path = require("path");
const BannerImageService = require("./service"); // Import the BannerImage service

// Create a new banner
const createBanner = async (req, res) => {
  try {
    const { status } = req.body; // We no longer need title or categoryName
    const images = req.files.map(file => path.join("uploads", file.filename)); // Process the uploaded files

    const bannerData = { status, images }; // Simplified banner data

    const newBanner = await BannerImageService.createBanner(bannerData);

    return res.status(201).json({
      message: "Banner created successfully",
      banner: newBanner,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating banner",
      error: err.message,
    });
  }
};

// Update an existing banner by ID
const updateBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;
    const { status } = req.body; // We no longer need title or categoryName

    // Handle image update if new files are provided
    let images = [];
    if (req.files) {
      images = req.files.map(file => path.join("uploads", file.filename)); // Update images with new uploads
    }

    const updateData = { status, images }; // Simplified update data

    const updatedBanner = await BannerImageService.updateBanner(bannerId, updateData);

    return res.status(200).json({
      message: "Banner updated successfully",
      banner: updatedBanner,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating banner",
      error: err.message,
    });
  }
};

// Get all banners
const getAllBanner = async (req, res) => {
  try {
    const banners = await BannerImageService.getAllBanners();
    return res.status(200).json({
      banners,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching banners",
      error: err.message,
    });
  }
};

// Get a single banner by ID
const getBannerById = async (req, res) => {
  try {
    const { bannerId } = req.params;
    const banner = await BannerImageService.getBannerById(bannerId);
    return res.status(200).json({
      banner,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching banner",
      error: err.message,
    });
  }
};

// Delete a banner by ID
const deleteBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;
    await BannerImageService.deleteBanner(bannerId);
    return res.status(200).json({
      message: "Banner deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting banner",
      error: err.message,
    });
  }
};

module.exports = {
  createBanner,
  updateBanner,
  getAllBanner,
  getBannerById,
  deleteBanner,
};
