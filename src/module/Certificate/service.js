const Certification = require('./model');

const createCertificationService = async (data) => {
  const certification = new Certification(data);
  return await certification.save();
};

const getAllCertificationsService = async () => {
  return await Certification.find();
};

const getCertificationByIdService = async (id) => {
  return await Certification.findById(id);
};

const updateCertificationService = async (id, data) => {
  return await Certification.findByIdAndUpdate(id, data, { new: true });
};

const deleteCertificationService = async (id) => {
  return await Certification.findByIdAndDelete(id);
};

module.exports = {
  createCertificationService,
  getAllCertificationsService,
  getCertificationByIdService,
  updateCertificationService,
  deleteCertificationService,
};
