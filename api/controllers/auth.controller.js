// import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async (req, res, next) => {
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

  // try {
  //   await newUser.save();
  //   res.status(201).json("user created successfully");
  // } catch (error) {
  //   next(error);
  // }

  // const newUser = await User.create({
  //   username, password: hashedPassword, email
  // })

  // console.log(email);

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "user with email and username already exist");
  }

  const newUser = new User({ username, password: hashedPassword, email });

  await newUser.save();
  res.status(201).json("user created successfully");
});

const signin = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  // find the user
  // password check

  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username and email is required");
  }

  // const user = await User.findOne({
  //   $or: [{ username }, { email }],
  // });
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "user does not exist");
  }

  const validPassword = bcryptjs.compareSync(password, user.password);

  if (!validPassword) {
    throw new ApiError(400, "Wrong credentials!");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  console.log(user);

  const loggedinUser = await User.findById(user._id).select("-password");

  res.cookie("access_token", token, { httpOnly: true });

  return res.status(200).json(loggedinUser);
});

const google = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ApiError(400, "Don't have an user");
  }

  if (user) {
    // sign in the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const loggedinUser = await User.findById(user._id).select("-password");
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(loggedinUser);
  } else {
    // sign up the user
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8); // generated 16 character password
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      password: hashedPassword,
      email: req.body.email,
      avatar: req.body.photo,
    });
    await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  }
});

const signOut = asyncHandler(async (req, res) => {
  // if (req.user.id !== req.params.id) {
  //   throw new ApiError(400, "You can only sign out your own account!")
  // } we done this when we was deleting the user but now here ig
 try {
   res.clearCookie("access_token");
   res.status(200).json("User has been logged out!");
 } catch (error) {
  throw new ApiError(error)
 }
});

export { signup, signin, google, signOut };
