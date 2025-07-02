import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {

            throw new ApiError(409, "User does not exists.");
        }
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    try {
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
    } catch (error) {
        throw new ApiError(401, "Registration Failed");

    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email && !username) {
            throw new ApiError(404, "Email or username required for login.");
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            throw new ApiError(404, "User does not exist or invalid email or username");
        }

        const checkPassword = await user.isPasswordCorrect(password);

        if (!checkPassword) {
            throw new ApiError(401, "Invalid password");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        let loggedInUser = await User.findById(user._id).select("-password").lean();

        const options = {
            httpOnly: true,
            secure: true
        }

        // console.log("Sending user data:", loggedInUser); 

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser,
                        accessToken,
                        refreshToken
                    },
                    "User Logged In Successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, error, "User login Failed");

    }

})

const logoutUser = asyncHandler((req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User Logged out Successfully"))
    } catch (error) {
        throw new ApiError(401, "logout failed");

    }
})

const updateAccessToken = asyncHandler(async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new ApiError(400, "Refresh token not found log in again");
        }
        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decode);

        if (!decode) {
            throw new ApiError(400, "Failed to update accessToken");
        }
        const updatedAccessToken = jwt.sign({ _id: decode._id, }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
        const updatedRefreshToken = jwt.sign({ _id: decode._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .cookie("accessToken", updatedAccessToken, options)
            .cookie("refreshToken", updatedRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: decode,
                        updatedAccessToken,
                        updatedRefreshToken
                    },
                    "Updated access token successfully"
                )
            )

    }
    catch (error) {
        throw new ApiError(404, "Failed to update accessToken");
    }
});

const updateProfile = asyncHandler(async (req, res) => {
    const { userId, username, email, firstname, lastname } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    if (username && username !== user.username) {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            throw new ApiError(400, "Username already exists");
        }
        user.username = username;
    }

    if (email && email !== user.email) {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            throw new ApiError(400, "Email already exists");
        }
        user.email = email;
    }

    if (firstname?.trim()) {
        user.firstname = firstname;
    }

    if (lastname?.trim()) {
        user.lastname = lastname;
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
    });
});


const getUserInfo = asyncHandler(async (req, res) => {
    try {
        const { userid } = req.body;

        if (!userid) {
            throw new ApiError(401, "User id not provided");
        }

        const user = await User.findById(userid);

        if (!user) {
            throw new ApiError(401, "User does not exist");
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: user,
                    },
                    "User info"
                ))
    } catch (error) {
        throw new ApiError(401, "Failed to get user info");
    }
});


const changeCurrentPassword = asyncHandler(async(req,res) =>{
    const {userId,oldPassword,newPassword} = req.body
    
    const user = await User.findById(userId)
    
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect) {
        throw new ApiError(400,"Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Password changed successfully"))
})

//updatey user profile pending
export { registerUser, loginUser, logoutUser, updateAccessToken, getUserInfo, updateProfile, changeCurrentPassword}