const Partnership = require('./entity/model');

exports.createPartner = async (partnerData) => {
  const partner = new Partnership(partnerData);
  return await partner.save();
};

exports.getAllPartners = async () => {
  return await Partnership.find();
};

exports.getPartnerById = async (id) => {
  return await Partnership.findById(id);
};

exports.updatePartner = async (id, updatedData) => {
  return await Partnership.findByIdAndUpdate(id, updatedData, { new: true });
};

exports.deletePartner = async (id) => {
  return await Partnership.findByIdAndDelete(id);
};
