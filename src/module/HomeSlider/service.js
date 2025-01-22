const SliderImage = require("./model");

const createSliderImage = async (imagePath, altText) => {
  const sliderImage = new SliderImage({
    image: imagePath,
    altText,
  });
  await sliderImage.save();
  return sliderImage;
};

const getAllSliderImages = async () => {
  return await SliderImage.find();
};

const getSliderImageById = async (id) => {
  return await SliderImage.findById(id);
};

const updateSliderImage = async (id, updateData) => {
  return await SliderImage.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSliderImage = async (id) => {
  return await SliderImage.findByIdAndDelete(id);
};

module.exports = {
  createSliderImage,
  getAllSliderImages,
  getSliderImageById,
  updateSliderImage,
  deleteSliderImage,
};
