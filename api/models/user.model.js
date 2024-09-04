import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      //   lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // fullName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   index: true,
    // },
    // avatar: {
    //   type: String, // cloudinary string
    //   required: true,
    // },
    // coverImage: {
    //   type: String,
    // },
    // refreshToken: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);