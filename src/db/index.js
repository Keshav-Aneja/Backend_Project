import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMONGODB Connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    // explore this connectionInstance
  } catch (error) {
    console.log("MONGODB connection failed", error);
    // Here we can also throw an error, but nodejs gives us access to the current process in which our program is running
    process.exit(1);
    // Learn more about this process
  }
};

export default connectDB;
