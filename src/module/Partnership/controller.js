const PartnershipService = require("./service");
const { uploadToFTP } = require("../../utils/fileUpload"); // Import the FTP upload function

exports.createPartner = async (req, res) => {
  try {
    // Prepare partner data
    const partnerData = {
      partnerName: req.body.partnerName,
      partnerPhoneNumber: req.body.partnerPhoneNumber,
      partnerEmail: req.body.partnerEmail,
      partnerAddress: req.body.partnerAddress,
      productName: req.body.productName,
      productDetails: req.body.productDetails,
      productStock: req.body.productStock,
    };

    // Upload partner image if it exists
    if (req.files["partnerImage"]) {
      try {
        const partnerImageUrl = await uploadToFTP(req.files["partnerImage"][0]);
        partnerData.partnerImage = partnerImageUrl; // Store the FTP URL
      } catch (err) {
        return res.status(500).json({ success: false, message: `Partner image upload failed: ${err.message}` });
      }
    }

    // Upload product images if they exist
    if (req.files["productImages"]) {
      try {
        const productImageUrls = await Promise.all(
          req.files["productImages"].map((file) => uploadToFTP(file))
        );
        partnerData.productImages = productImageUrls; // Store the FTP URLs
      } catch (err) {
        return res.status(500).json({ success: false, message: `Product images upload failed: ${err.message}` });
      }
    }

    // Create the partner entry
    const partner = await PartnershipService.createPartner(partnerData);
    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await PartnershipService.getAllPartners();
    res.status(200).json({ success: true, data: partners });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const partner = await PartnershipService.getPartnerById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const updatedData = {
      partnerName: req.body.partnerName,
      partnerPhoneNumber: req.body.partnerPhoneNumber,
      partnerEmail: req.body.partnerEmail,
      partnerAddress: req.body.partnerAddress,
      productName: req.body.productName,
      productDetails: req.body.productDetails,
      productStock: req.body.productStock,
    };

    // Upload partner image if it exists
    if (req.files["partnerImage"]) {
      try {
        const partnerImageUrl = await uploadToFTP(req.files["partnerImage"][0]);
        updatedData.partnerImage = partnerImageUrl; // Store the FTP URL
      } catch (err) {
        return res.status(500).json({ success: false, message: `Partner image upload failed: ${err.message}` });
      }
    }

    // Upload product images if they exist
    if (req.files["productImages"]) {
      try {
        const productImageUrls = await Promise.all(
          req.files["productImages"].map((file) => uploadToFTP(file))
        );
        updatedData.productImages = productImageUrls; // Store the FTP URLs
      } catch (err) {
        return res.status(500).json({ success: false, message: `Product images upload failed: ${err.message}` });
      }
    }

    // Update the partner entry
    const partner = await PartnershipService.updatePartner(req.params.id, updatedData);
    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partner = await PartnershipService.deletePartner(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }
    res.status(200).json({ success: true, message: "Partner deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
