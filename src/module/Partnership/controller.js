const PartnershipService = require("./service");
const path = require("path"); 
exports.createPartner = async (req, res) => {
  try {
    const partnerData = {
      partnerImage: req.files["partnerImage"]
        ? path.join("uploads", req.files["partnerImage"][0].filename)
        : null,
      productImages: req.files["productImages"]
        ? req.files["productImages"].map((file) =>
            path.join("uploads", file.filename)
          )
        : [],
      partnerName: req.body.partnerName,
      partnerPhoneNumber: req.body.partnerPhoneNumber,
      partnerEmail: req.body.partnerEmail,
      partnerAddress: req.body.partnerAddress,
      productName: req.body.productName,
      productDetails: req.body.productDetails,
      productStock: req.body.productStock,
    };
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
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const updatedData = {
      partnerImage: req.files["partnerImage"]
        ? path.join("uploads", req.files["partnerImage"][0].filename)
        : undefined,
      productImages: req.files["productImages"]
        ? req.files["productImages"].map((file) =>
            path.join("uploads", file.filename)
          )
        : undefined,
      partnerName: req.body.partnerName,
      partnerPhoneNumber: req.body.partnerPhoneNumber,
      partnerEmail: req.body.partnerEmail,
      partnerAddress: req.body.partnerAddress,
      productName: req.body.productName,
      productDetails: req.body.productDetails,
      productStock: req.body.productStock,
    };

    const partner = await PartnershipService.updatePartner(
      req.params.id,
      updatedData
    );
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
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
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Partner deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
