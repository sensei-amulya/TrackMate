import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

// ✅ The /me endpoint
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
