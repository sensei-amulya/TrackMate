import Progress from "../models/progress.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// Add progress
export const addProgress = async (req, res) => {
  try {
    const { userId, day, dsa, gym } = req.body;

    const newProgress = new Progress({
      userId,
      day,
      dsa,
      gym,
    });

    await newProgress.save();

    res.json(
      new ApiResponse(
        200,
        {
          success: true,

          data: newProgress,
        },
        "Progress added successfully"
      )
    );
  } catch (error) {
    res.json(new ApiError(500, null, error.message));
  }
};

// Get progress for a user (last 7 days)
export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const progress = await Progress.find({ userId })
      .sort({ createdAt: -1 })
      .limit(7);

    res.json(new ApiResponse(200, { success: true, data: progress }));
  } catch (error) {
    res.json(new ApiError(500, null, error.message));
  }
};
