const productService = require("./service");
const path = require("path");
// Create product controller
const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Handle image upload (assuming images are provided in `req.files`)
    const productImages = req.files
      ? req.files.map((file) => path.join("uploads", file.filename))
      : [];

    // Add the image paths to product data
    productData.images = productImages;

    // Call the service method to create the product
    const product = await productService.createProduct(productData);

    // Respond with the success status and product data
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all products controller
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get product by ID controller
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update product controller
const updateProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Handle image update (only if new images are uploaded)
    const productImages = req.files ? req.files.map((file) => path.join("uploads", file.filename)) : [];
    if (productImages.length > 0) {
      productData.images = productImages;
    }

    const updatedProduct = await productService.updateProduct(
      req.params.productId,
      productData
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete product controller
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(
      req.params.productId
    );
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
