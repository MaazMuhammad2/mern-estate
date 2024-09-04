// import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/apiError.js";
import bcryptjs from "bcryptjs";

const signup = asyncHandler(async (req, res) => {
  // get user detail from the frontend
  // check if the email or password is not empty
  // check already user exist? username, email

  const { username, password, email } = req.body;
  console.log(req.body);

  if ([email, password, username].some((field) => field?.trim() == "")) {
    throw new ApiError(400, "All fields are required");

    // .some() is an array method that checks whether at least one element in the array passes a certain test
    // trim: his method removes any leading (before) and trailing (after) whitespace from a string. So " abc " becomes "abc", and " " becomes "" (empty string).
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Email is incorrect");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, password: hashedPassword, email });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    throw new ApiError(500, "User already exist");
  }

  // const newUser = await User.create({
  //   username, password: hashedPassword, email
  // })

  // console.log(email);

  // const existedUser = await User.findOne({
  //   $or: [{ username }, { email }],
  // });

  // if (existedUser) {
  //   throw new ApiError(400, "user with email and username already exist");
  // }

});

export { signup };
