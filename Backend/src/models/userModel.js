import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    profilepicture: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    workspaces: {
        type: [String],
        default: []
    }
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function () {

    const payload = { _id: this._id, email: this.email };
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined in environment variables');
    }
    
    return jwt.sign(payload, secret, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

userSchema.methods.generateRefreshToken = function () {
    
    const payload = { _id: this._id, };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    
    if (!secret) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
    }
    
    return jwt.sign(payload, secret, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
}

export const User = mongoose.model("User", userSchema)