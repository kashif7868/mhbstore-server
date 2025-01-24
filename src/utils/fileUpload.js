const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/'); // Destination for uploaded files
  },

  filename: (req, file, cb) => {
    // Save file with original extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// File filter to accept all file types (no validation)
const fileFilter = (req, file, cb) => {
  cb(null, true); // Accept all files
};

// Define the multer upload middleware (no size limit and no file type restriction)
const fileUpload = multer({ 
  storage,
  fileFilter, // No file type validation
  limits: { fileSize: Infinity }, // No file size limit
});

module.exports = {
  fileUpload,
};
