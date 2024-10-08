import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import bcryptjs from "bcryptjs";
import Listing from "../models/listing.models.js";

const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user?.id !== req.params.id) {
    throw new ApiError(401, "You can only update your own account");
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    throw new ApiError(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    throw new ApiError(401, "you can only delete your own account!");
  }
  await User.findByIdAndDelete(req.params.id);
  res.clearCookie("access_token");
  res.status(200).json("User has been deleted!");
});

const getUserListings = asyncHandler(async (req, res) => {
  if (req.user.id === req.params.id) {
    const lisitings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(lisitings);
  } else {
    throw new ApiError(401, "You can only view your own lisitngs");
  }
});

const getUser = asyncHandler(async (req, res) => {
 try {
   const user = await User.findById(req.params.id).select("-password")
   if (!user) {
     throw new ApiError(400, "User not found");
   }
   res.status(200).json(user)
 } catch (error) {
  throw new ApiError(400, error)
 }
});

export { updateUser, deleteUser, getUserListings, getUser };
