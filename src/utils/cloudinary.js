import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// we will mostly use .unlink(path) function to unlink files from our path system, the internal deletion command actually works by either linking or unlinking the files, rather than removing the file. file wahi rahti hai, bas unlink ho jati hai. there is no delete in file system there is only unlink
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    // console.log(
    //   "File has been uploaded successfully on cloudinary🚀",
    //   response.url
    // );
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file, as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
