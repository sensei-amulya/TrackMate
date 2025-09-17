import express from "express";

const router = express.Router();

// Logout
router.post("/", (req, res) => {
  // In JWT auth, logout is handled client-side by deleting the token.
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

export default router;
