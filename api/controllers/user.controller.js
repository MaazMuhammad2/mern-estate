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

    const deleteUser = asyncHandler(async(req, res)=>{
        if (req.user.id !== req.params.id) {
            throw new ApiError(401, "you can only delete your own account!")
        }
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json("User has been deleted!")
    })
export { updateUser, deleteUser };