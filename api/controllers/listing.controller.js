import Listing from "../models/listing.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(201).json(listing);
});

export { createListing };
