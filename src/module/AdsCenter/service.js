const AdsCenter = require('./entity/model');

exports.createAd = async (image, link, startDate, endDate, status) => {
  const ad = new AdsCenter({ image, link, startDate, endDate, status });
  await ad.save();
  return ad;
};

exports.getAllAds = async () => {
  return await AdsCenter.find({ status: 'Active' });
};

exports.getAdById = async (id) => {
  return await AdsCenter.findById(id);
};

exports.updateAd = async (id, updatedData) => {
  return await AdsCenter.findByIdAndUpdate(id, updatedData, { new: true });
};

exports.deleteAd = async (id) => {
  return await AdsCenter.findByIdAndDelete(id);
};
