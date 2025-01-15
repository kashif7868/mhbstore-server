const Product = require('./entity/model');

// Create a new product
const createProduct = async (productData) => {
    const product = new Product({
        ...productData,
        images: productData.images,  // Ensure the images are handled properly
    });
    return await product.save();
};

// Get all products
const getAllProducts = async () => {
    return await Product.find();
};

// Get a product by its ID
const getProductById = async (productId) => {
    return await Product.findById(productId);
};

// Update a product by ID
const updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, {
        ...productData,
        images: productData.images || [], // Ensure images are handled properly
    }, { new: true });
};

// Delete a product by ID
const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
