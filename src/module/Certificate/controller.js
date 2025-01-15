const Certification = require('./entity/model'); // Ensure this is your correct model
const ApiError = require('../../utils/ApiError'); // Custom error handler
const path = require('path'); // Path module for file path manipulation

// Create a new certification
const createCertification = async (req, res, next) => {
  try {
    const { name, detail } = req.body; // Extract name and detail from request body
    const image = req.file ? path.join('uploads', req.file.filename) : ''; // If there's a file, get its path relative to public/uploads

    const newCertification = new Certification({
      name,
      detail,
      image, // Store relative image path
    });

    await newCertification.save();

    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: newCertification,
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};

// Get all certifications
const getAllCertification = async (req, res, next) => {
  try {
    const certifications = await Certification.find(); // Fetch all certifications
    res.status(200).json({
      success: true,
      data: certifications,
    });
  } catch (error) {
    next(error);
  }
};

// Get certification by ID
const getCertificationById = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.certificationId); // Find by ID

    if (!certification) {
      throw new ApiError(404, 'Certification not found');
    }

    res.status(200).json({
      success: true,
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

// Update certification by ID
const updateCertification = async (req, res, next) => {
  try {
    const { name, detail } = req.body; // Extract name and detail from request body
    const image = req.file ? path.join('uploads', req.file.filename) : ''; // If there's a file, get its path

    const updatedCertification = await Certification.findByIdAndUpdate(
      req.params.certificationId, // Find by ID
      { name, detail, image }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedCertification) {
      throw new ApiError(404, 'Certification not found');
    }

    res.status(200).json({
      success: true,
      message: 'Certification updated successfully',
      data: updatedCertification,
    });
  } catch (error) {
    next(error);
  }
};

// Delete certification by ID
const deleteCertification = async (req, res, next) => {
  try {
    const deletedCertification = await Certification.findByIdAndDelete(req.params.certificationId); // Find and delete by ID

    if (!deletedCertification) {
      throw new ApiError(404, 'Certification not found');
    }

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCertification,
  getAllCertification,
  getCertificationById,
  updateCertification,
  deleteCertification,
};
