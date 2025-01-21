const multer = require('multer');
const ftp = require('basic-ftp');
const path = require('path');

// Multer Storage Configuration (no local storage)
const storage = multer.memoryStorage(); // Store files in memory (instead of a local folder)

// File filter for image and video files
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4)$/)) {
    req.fileValidationError = 'Only image or video files are allowed!';
    return cb(new Error('Only image or video files are allowed!'), false);
  }
  cb(null, true); // Accept the file
};

// Multer setup
const fileUpload = multer({
  storage: storage, // Use memory storage
  fileFilter: imageFilter, // File validation
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// FTP Configuration details
const ftpConfig = {
  host: 'ftp.mhbstore.com', // FTP server address
  user: 'u618811403', // FTP username
  password: 'Mhbstore@786$', // FTP password
  secure: true, // Use secure FTP (FTPS) directly
  secureOptions: {
    rejectUnauthorized: false, // Optional, for self-signed certificates
  },
};

// FTP Client Setup
const client = new ftp.Client();
client.ftp.verbose = true; // Enable FTP debug mode (optional)

// Function to upload the file to FTP server
const uploadToFTP = async (file) => {
  try {
    // Connect to FTP server securely
    await client.access(ftpConfig);

    // Ensure the target directory exists
    await client.ensureDir('/public_html/images/');

    // Upload file directly from memory buffer to FTP server
    await client.uploadFrom(file.buffer, file.originalname);

    // Return the URL of the uploaded image on the server
    const imageUrl = `https://www.mhbstore.com/images/${file.originalname}`;
    return imageUrl;

  } catch (err) {
    console.error("Error during FTP upload:", err.message);

    // Retry mechanism if the upload fails
    setTimeout(async () => {
      try {
        await client.access(ftpConfig); // Retry FTP connection
        await client.uploadFrom(file.buffer, file.originalname); // Retry uploading
        const imageUrl = `https://www.mhbstore.com/images/${file.originalname}`;
        return imageUrl;
      } catch (retryErr) {
        throw new Error('Retry failed: ' + retryErr.message);
      }
    }, 5000); // Retry after 5 seconds

    throw new Error('Error uploading file to FTP server: ' + err.message);
  } finally {
    client.close(); // Close FTP session after upload
  }
};

// Export multer upload middleware and FTP upload function
module.exports = {
  fileUpload,
  uploadToFTP,
};
