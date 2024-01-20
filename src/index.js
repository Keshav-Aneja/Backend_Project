// require("dotenv").config({ path: "./env" }); but this is not matching with the imports
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({ path: "./env" });
import { app } from "./app.js";
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
    app.on("error", () => {
      console.log(
        "Database Connected but, Application not able to talk to database"
      );
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection failed!!! ", err);
  });

/* --- BASIC APPROACH ----
import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
const app = express();
(async () => {
  try {
    mongoose.connect(`${proecess.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", () => {
      console.log(
        "Database Connected but, Application not able to talk to database"
      );
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log("App is listening on PORT" + process.env.PORT);
    });
  } catch (error) {
    console.log(error);
    throw err;
  }
})();
*/
