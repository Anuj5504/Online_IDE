import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        if(!user) {
            throw new ApiError(409, "User does not exists.");
        }
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token");
    }
}
const registerUser = asyncHandler(async (req, res) => {
    const { username, firstname, lastname, email, password, } = req.body;

    if ([username, email, password, firstname, lastname].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const checkExisted = await User.findOne({ $or: [{ username }, { email }] });

    if (checkExisted) {
        throw new ApiError(409, "User already exists.");
    }

    const user = await User.create({
        username,
        firstname,
        lastname,
        email,
        password
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )
})

export  {registerUser}