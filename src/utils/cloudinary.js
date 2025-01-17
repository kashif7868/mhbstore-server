import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically detect the file type (image/video)
        });
        // File has been uploaded successfully
        fs.unlinkSync(localFilePath); // Remove local file after uploading
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the file if upload fails
        return null;
    }
};

export { uploadOnCloudinary };
