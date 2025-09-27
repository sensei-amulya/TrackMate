import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ The /me endpoint
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
