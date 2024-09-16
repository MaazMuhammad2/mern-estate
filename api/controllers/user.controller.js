import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import bcryptjs from "bcryptjs";

    const updateUser = asyncHandler(async (req,res,next) => {
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
export { updateUser };