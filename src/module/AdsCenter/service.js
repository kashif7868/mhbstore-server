const AdsImage = require("./entity/model"); // Import the AdsImage model

// Create a new ad image
const createAdImage = async (adImageData) => {
  try {
    const newAdImage = new AdsImage(adImageData); // Use the correct model here
    await newAdImage.save();
    return newAdImage;
  } catch (err) {
    throw new Error("Error creating ad image: " + err.message);
  }
};

// Update an existing ad image by ID
const updateAdImage = async (adImageId, updateData) => {
  try {
    const updatedAdImage = await AdsImage.findByIdAndUpdate(adImageId, updateData, { new: true });
    if (!updatedAdImage) {
      throw new Error("Ad image not found");
    }
    return updatedAdImage;
  } catch (err) {
    throw new Error("Error updating ad image: " + err.message);
  }
};

// Get all ad images
const getAllAdImages = async () => {
  try {
    const adImages = await AdsImage.find();
    return adImages;
  } catch (err) {
    throw new Error("Error fetching ad images: " + err.message);
  }
};

// Get a single ad image by ID
const getAdImageById = async (adImageId) => {
  try {
    const adImage = await AdsImage.findById(adImageId);
    if (!adImage) {
      throw new Error("Ad image not found");
    }
    return adImage;
  } catch (err) {
    throw new Error("Error fetching ad image: " + err.message);
  }
};

// Delete an ad image by ID
const deleteAdImage = async (adImageId) => {
  try {
    const deletedAdImage = await AdsImage.findByIdAndDelete(adImageId);
    if (!deletedAdImage) {
      throw new Error("Ad image not found");
    }
    return deletedAdImage;
  } catch (err) {
    throw new Error("Error deleting ad image: " + err.message);
  }
};

module.exports = {
  createAdImage,
  updateAdImage,
  getAllAdImages,
  getAdImageById,
  deleteAdImage,
};
