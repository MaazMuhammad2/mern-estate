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
  res.status(200).json("Listing deleted successfully");
});

const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ApiError(404, "Listing not found!");
  }
  if (req.user.id !== listing.userRef) {
    throw new ApiError(401, "You can only update your own listing");
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ApiError(404, "Listing not found!");
  }
  res.status(200).json(listing);
});

const getListings = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;

  // Convert string "true"/"false" to boolean values
  let offer = req.query.offer === "true";
  if (req.query.offer === undefined) {
    offer = { $in: [true, false] };
  }

  let furnished = req.query.furnished === "true";
  if (req.query.furnished === undefined) {
    furnished = { $in: [true, false] };
  }

  let parking = req.query.parking === "true";
  if (req.query.parking === undefined) {
    parking = { $in: [true, false] };
  }

  let type = req.query.type;
  if (type === undefined || type === "all") {
    type = { $in: ["sale", "rent"] };
  }

  const searchTerm = req.query.searchTerm || "";
  const sort = req.query.sort || "createdAt";
  
  // Ensure order is either "asc" or "desc"
  const order = req.query.order === "asc" || req.query.order === "desc" ? req.query.order : "desc";
  const nameFilter = searchTerm ? { name: { $regex: searchTerm, $options: "i" } } : {};


  try {
    const listings = await Listing.find({
      nameFilter,
      offer,
      furnished,
      parking,
      type,
    })
      .sort({
        [sort]: order, // Dynamically apply sorting field and order
      })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});


export { createListing, deleteListing, updateListing, getListing, getListings };
