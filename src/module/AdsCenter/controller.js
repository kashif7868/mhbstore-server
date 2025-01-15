const AdsCenterService = require('./service');

exports.createAd = async (req, res) => {
  try {
    const { image, link, startDate, endDate, status } = req.body;
    const ad = await AdsCenterService.createAd(image, link, startDate, endDate, status);
    res.status(201).json({ success: true, ad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const ads = await AdsCenterService.getAllAds();
    res.status(200).json({ success: true, ads });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await AdsCenterService.getAdById(id);
    if (!ad) {
      return res.status(404).json({ success: false, message: 'Ad not found' });
    }
    res.status(200).json({ success: true, ad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAd = await AdsCenterService.updateAd(id, updatedData);
    if (!updatedAd) {
      return res.status(404).json({ success: false, message: 'Ad not found' });
    }
    res.status(200).json({ success: true, ad: updatedAd });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAd = await AdsCenterService.deleteAd(id);
    if (!deletedAd) {
      return res.status(404).json({ success: false, message: 'Ad not found' });
    }
    res.status(200).json({ success: true, message: 'Ad deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
