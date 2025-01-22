// const multer = require('multer');
// const ftp = require('basic-ftp');
// const path = require('path');
// const stream = require('stream'); // Import stream module

// // Multer Storage Configuration (no local storage)
// const storage = multer.memoryStorage(); // Store files in memory (instead of a local folder)

// // File filter for image and video files
// const imageFilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4)$/)) {
//     req.fileValidationError = 'Only image or video files are allowed!';
//     return cb(new Error('Only image or video files are allowed!'), false);
//   }
//   cb(null, true); // Accept the file
// };

// // Multer setup
// const fileUpload = multer({
//   storage: storage, // Use memory storage
//   fileFilter: imageFilter, // File validation
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
// });

// // FTP Configuration details
// const ftpConfig = {
//   host: 'ftp.mhbstore.com', // FTP server ka address
//   user: 'u618811403.mhbstore', // FTP username
//   password: 'Mhbstore@786$', // FTP password
//   secure: true, // Yeh ensure karta hai ke FTP connection secure ho
//   secureOptions: {
//     rejectUnauthorized: false, // Agar self-signed certificate use ho raha ho toh isko false rakhna
//   },
// };

// // FTP Client Setup
// const client = new ftp.Client();
// client.ftp.verbose = true; // Enable FTP debug mode (optional)

// // Function to upload the file to FTP server
// const uploadToFTP = async (file) => {
//   try {
//     // Secure connection to FTP server
//     await client.access(ftpConfig); 
    
//     // Ensure the target directory exists
//     await client.ensureDir('images/'); 
    
//     // Convert buffer to readable stream
//     const bufferStream = new stream.PassThrough();
//     bufferStream.end(file.buffer);

//     // Upload the file from the readable stream
//     await client.uploadFrom(bufferStream, file.originalname); // Ensure the upload happens before moving to the next task

//     const imageUrl = `https://www.mhbstore.com/images/${file.originalname}`;
//     return imageUrl;

//   } catch (err) {
//     console.error("FTP upload error:", err.message);
//     throw new Error('FTP server file upload error: ' + err.message);
//   } finally {
//     // Close FTP session only after all tasks are complete
//     client.close(); 
//   }
// };


// // Export multer upload middleware and FTP upload function
// module.exports = {
//   fileUpload,
//   uploadToFTP,
// };
