const Joi = require('joi');

const createCertification = Joi.object({
  name: Joi.string().required(),
  detail: Joi.string().required(),
  image: Joi.string().optional(), // Image path is optional during creation
});

const updateCertification = Joi.object({
  name: Joi.string().optional(),
  detail: Joi.string().optional(),
  image: Joi.string().optional(), // Image can be updated or omitted
});

const getCertificationById = Joi.object({
  certificationId: Joi.string().required(), // ID should be provided to get the certification
});

const deleteCertification = Joi.object({
  certificationId: Joi.string().required(), // ID should be provided to delete the certification
});

module.exports = {
  createCertification,
  updateCertification,
  getCertificationById,
  deleteCertification,
};
