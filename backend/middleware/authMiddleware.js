import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js"; // if you already use ApiError

// Middleware to check JWT and attach user
export const protect = async (req, res, next) => {
  try {
    // get token from cookie OR Authorization header
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json(new ApiError(401, null, "No token provided"));
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user (exclude password)
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json(new ApiError(404, null, "User not found"));
    }
    req.params.userId = req.user._id.toString(); // attach userId to params for routes that need it
    next();
  } catch (err) {
    return res.status(401).json(new ApiError(401, null, "Invalid token"));
  }
};
