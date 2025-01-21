const { fileUpload, uploadToFTP } = require("../../utils/fileUpload");
const SliderImage = require("./entity/model"); // Import the SliderImage model

// Create a new slider image (post a new slider image)
const createSliderImage = async (req, res) => {
  try {
    const { altText } = req.body;
    const { file } = req;

    // Upload file to FTP and get the public URL
    const imageUrl = await uploadToFTP(file);

    const newSliderImage = new SliderImage({
      image: imageUrl, // Use the cloud URL for the image
      altText,
    });

    await newSliderImage.save();
    res.status(201).json({
      message: "Slider image created successfully",
      data: newSliderImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating slider image", error });
  }
};

// Get all slider images
const getAllSliderImages = async (req, res) => {
  try {
    const sliderImages = await SliderImage.find();
    res.status(200).json({
      message: "Slider images retrieved successfully",
      data: sliderImages,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching slider images", error });
  }
};

// Get a single slider image by ID
const getSliderImageById = async (req, res) => {
  try {
    const { sliderId } = req.params;
    const sliderImage = await SliderImage.findById(sliderId);
    if (!sliderImage) {
      return res.status(404).json({ message: "Slider image not found" });
    }
    res.status(200).json({
      message: "Slider image fetched successfully",
      data: sliderImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching slider image", error });
  }
};

// Update an existing slider image
const updateSliderImage = async (req, res) => {
  try {
    const { sliderId } = req.params;
    const { altText } = req.body;
    const updateData = {};

    if (req.file) {
      // Upload the new image to FTP and get the URL
      const imageUrl = await uploadToFTP(req.file);
      updateData.image = imageUrl; // Set the new image URL
    }

    if (altText) {
      updateData.altText = altText;
    }

    const updatedSliderImage = await SliderImage.findByIdAndUpdate(
      sliderId,
      updateData,
      { new: true }
    );

    if (!updatedSliderImage) {
      return res.status(404).json({ message: "Slider image not found" });
    }

    res.status(200).json({
      message: "Slider image updated successfully",
      data: updatedSliderImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating slider image", error });
  }
};

// Delete a slider image by ID
const deleteSliderImage = async (req, res) => {
  try {
    const { sliderId } = req.params;
    const deletedSliderImage = await SliderImage.findByIdAndDelete(sliderId);

    if (!deletedSliderImage) {
      return res.status(404).json({ message: "Slider image not found" });
    }

    res.status(200).json({
      message: "Slider image deleted successfully",
      data: deletedSliderImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting slider image", error });
  }
};

module.exports = {
  createSliderImage,
  getAllSliderImages,
  getSliderImageById,
  updateSliderImage,
  deleteSliderImage,
};
