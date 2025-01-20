const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define Persistent Disk path (for Render or similar services)
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'src/uploads/';

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR); // Destination for uploaded files
  },
  filename: (req, file, cb) => {
    // Save file with original extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Image file filter for validation (accepts image and video formats)
const imageFilter = (req, file, cb) => {
  // Validate file extensions (only image and video formats allowed)
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/i)) {
    req.fileValidationError = 'Only image and video files are allowed!';
    return cb(new Error('Only image and video files are allowed!'), false);
  }
  cb(null, true); // Accept the file
};

// Define the multer upload middleware (supports multiple file uploads)
const fileUpload = multer({
  storage,
  fileFilter: imageFilter, // Add file filter for validation
  limits: { fileSize: 10 * 1024 * 1024 }, // Optional: Limit the file size to 10MB (adjust as needed)
});

// Middleware to handle upload errors
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // An unknown error occurred
    return res.status(500).json({ error: err.message });
  }
  next();
};

module.exports = {
  fileUpload,
  handleUploadError,
};
