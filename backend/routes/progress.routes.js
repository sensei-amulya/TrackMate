import express from "express";
import {
  addProgress,
  getUserProgress,
} from "../controllers/progress.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST -> Add progress
router.post("/progress", protect, addProgress);

// GET -> Get last 7 days progress for a user
router.get("/progress/:userId", protect, getUserProgress);

export default router;
