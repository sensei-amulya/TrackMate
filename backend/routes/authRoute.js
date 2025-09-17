// routes/authRoute.js
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to check JWT and attach user
const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // if stored in cookie
    // OR: const token = req.headers.authorization?.split(" ")[1]; // if using Bearer token
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // exclude password
    if (!req.user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ The /me endpoint
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
