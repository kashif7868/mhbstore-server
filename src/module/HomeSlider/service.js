const BannerImage = require("./entity/model"); // Import the BannerImage model

// Create a new banner
async function createBanner(data) {
  try {
    const newBanner = new BannerImage(data);
    await newBanner.save();
    return newBanner;
  } catch (error) {
    throw new Error('Failed to create banner: ' + error.message);
  }
}

// Get all banners
async function getAllBanners() {
  try {
    const banners = await BannerImage.find();
    return banners;
  } catch (error) {
    throw new Error('Failed to retrieve banners: ' + error.message);
  }
}

// Get a banner by its ID
async function getBannerById(bannerId) {
  try {
    const banner = await BannerImage.findById(bannerId);
    if (!banner) {
      throw new Error('Banner not found');
    }
    return banner;
  } catch (error) {
    throw new Error('Failed to retrieve banner: ' + error.message);
  }
}

// Update an existing banner
async function updateBanner(bannerId, updateData) {
  try {
    const updatedBanner = await BannerImage.findByIdAndUpdate(bannerId, updateData, { new: true });
    if (!updatedBanner) {
      throw new Error('Banner not found');
    }
    return updatedBanner;
  } catch (error) {
    throw new Error('Failed to update banner: ' + error.message);
  }
}

// Delete a banner by its ID
async function deleteBanner(bannerId) {
  try {
    const deletedBanner = await BannerImage.findByIdAndDelete(bannerId);
    if (!deletedBanner) {
      throw new Error('Banner not found');
    }
    return deletedBanner;
  } catch (error) {
    throw new Error('Failed to delete banner: ' + error.message);
  }
}

module.exports = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner
};
