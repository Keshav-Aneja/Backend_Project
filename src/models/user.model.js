import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchmea = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //Cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, //Cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//pre hook is provided by mongoose to do some task just before doing something like sending data to the databse
userSchmea.pre("save", async function (next) {
  if (this.isModified("password")) return next(); //as we dont want it to again and again encrypt the password whenever we are chaning some other field like avatar,etc in our user schema and saving it
  this.password = await bcrypt.hash(this.password, 10); //hashrounds
  next();
}); //there are many events where we can call this pre hook like validate,save,updateOne, remove, deleteOne (check at docs of middleware of mongoose)
//pre ke andar wale callback me avoid using arrow function because in that we dont have the context of "this", because here the save event is working on userSchema so we should have access to that

// Now we have hashed and saved the password in the DB, but when we want to check if the password is correct or not, as the user will enter in the form of "abc123", and in our DB it will be stored in a hash, so we can also create our own methods using mongoose, we can create the name of the function (any name) like here isPasswordCorrect method and define the logic here
userSchmea.methods.isPasswordCorrect = async function (password) {
  //logic for checking password
  return await bcrypt.compare(password, this.password); //returns true or false
};

userSchmea.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = new mongoose.model("User", userSchmea);
