const ftp = require("basic-ftp");

const client = new ftp.Client();
client.ftp.verbose = true; // Optional: Enable debugging for FTP

// FTP Configuration details
const ftpConfig = {
    host: "ftp.mhbstore.com",  // FTP server address
    user: "u618811403",  // FTP username (check if this matches exactly)
    password: "Mhbstore@786$", // FTP password (ensure this is correct)
    secure: false,  // Use false for plain FTP (not FTPS)
  };
  
// Function to upload image to FTP server and return the URL
const uploadImageToFTP = async (file) => {
  try {
    await client.access(ftpConfig); // Connect to FTP server
    await client.ensureDir("/public_html/images/");  // Ensure the 'images' directory exists
    await client.uploadFrom(file.path, file.filename);  // Upload file to FTP server

    const imageUrl = `https://www.mhbstore.com/images/${file.filename}`;  // Construct the image URL based on your domain
    console.log("Image uploaded successfully! URL: ", imageUrl);
    return imageUrl;  // Return the full image URL
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;  // Throw error if upload fails
  } finally {
    client.close();  // Close FTP session after upload
  }
};

module.exports = { uploadImageToFTP };
