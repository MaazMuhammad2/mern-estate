import Listing from "../models/listing.models.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(201).json(listing);
});

const deleteListing = asyncHandler(async (req, res) => {
  // checking if listing exist or not
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ApiError(404, "Listing not found!");
  }

  if (req.user.id !== listing.userRef) {
    throw new ApiError(401, "You can only handle your own listing");
  }

  await Listing.findByIdAndDelete(req.params.id);
  res.status(200).json("Listing deleted successfully")
});

export { createListing, deleteListing };
