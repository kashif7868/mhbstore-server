const express = require("express");
const multer = require("multer");
const ftp = require("basic-ftp");
const path = require("path");

const app = express();
const client = new ftp.Client();
client.ftp.verbose = true; // Optional: Enable debugging for FTP

// Multer Configuration: Set storage engine and destination folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Path where the file will be stored temporarily before FTP upload
    cb(null, 'src/uploads/'); // Local folder where multer stores files temporarily
  },
  filename: (req, file, cb) => {
    // Generate unique filename using timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// FTP Configuration details
const ftpConfig = {
  host: "ftp.mhbstore.com",  // FTP server address
  user: "u618811403",  // FTP username
  password: "Mhbstore@786$", // FTP password
  secure: true,  // Use secure FTP if supported
};

// Function to upload image to FTP server and return the URL
const fileUpload = async (file) => {
  try {
    await client.access(ftpConfig); // Connect to FTP server
    await client.ensureDir("/public_html/images/");  // Ensure the 'images' directory exists on Hostinger
    await client.uploadFrom(file.path, file.filename);  // Upload file to FTP server

    // Construct the image URL based on your domain
    const imageUrl = `https://www.mhbstore.com/images/${file.filename}`;
    console.log("Image uploaded successfully! URL: ", imageUrl);
    return imageUrl;  // Return the full image URL
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;  // Throw error if upload fails
  } finally {
    client.close();  // Close FTP session after upload
  }
};

// Endpoint to handle image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;  // File uploaded using 'image' field name
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Upload file to FTP and get URL
    const imageUrl = await fileUpload(file);
    res.status(200).send({ message: 'File uploaded successfully', imageUrl });
  } catch (error) {
    res.status(500).send('Error uploading file: ' + error.message);
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
