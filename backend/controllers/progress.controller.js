import Progress from "../models/progress.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add or update progress
export const addProgress = async (req, res) => {
  try {
    const { userId, day, dsa, gym } = req.body;

    // Validate required fields
    if (!userId || !day) {
      return res.json(new ApiError(400, null, "User ID and day are required"));
    }

    // Check if progress already exists for this user and day
    const existingProgress = await Progress.findOne({ userId, day });

    if (existingProgress) {
      // Update existing progress
      existingProgress.dsa = dsa || 0;
      existingProgress.gym = gym || 0;
      await existingProgress.save();

      return res.json(
        new ApiResponse(
          200,
          {
            success: true,
            data: existingProgress,
          },
          "Progress updated successfully"
        )
      );
    } else {
      // Create new progress entry
      const newProgress = new Progress({
        userId,
        day,
        dsa: dsa || 0,
        gym: gym || 0,
      });

      await newProgress.save();

      return res.json(
        new ApiResponse(
          200,
          {
            success: true,
            data: newProgress,
          },
          "Progress added successfully"
        )
      );
    }
  } catch (error) {
    console.error("Error in addProgress:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.json(
        new ApiError(400, null, "Progress for this day already exists")
      );
    }

    return res.json(new ApiError(500, null, error.message));
  }
};

// Get progress for a user (last 7 days)
export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.json(new ApiError(400, null, "User ID is required"));
    }

    const progress = await Progress.find({ userId })
      .sort({ createdAt: -1 })
      .limit(7);

    return res.json(
      new ApiResponse(
        200,
        { success: true, data: progress },
        "Progress retrieved successfully"
      )
    );
  } catch (error) {
    console.error("Error in getUserProgress:", error);
    return res.json(new ApiError(500, null, error.message));
  }
};

// Get progress for a specific date
export const getProgressByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;

    if (!userId || !date) {
      return res.json(new ApiError(400, null, "User ID and date are required"));
    }

    const progress = await Progress.findOne({ userId, day: date });

    return res.json(
      new ApiResponse(
        200,
        { success: true, data: progress },
        progress ? "Progress found" : "No progress found for this date"
      )
    );
  } catch (error) {
    console.error("Error in getProgressByDate:", error);
    return res.json(new ApiError(500, null, error.message));
  }
};

// Delete progress for a specific date
export const deleteProgress = async (req, res) => {
  try {
    const { userId, date } = req.params;

    if (!userId || !date) {
      return res.json(new ApiError(400, null, "User ID and date are required"));
    }

    const deletedProgress = await Progress.findOneAndDelete({
      userId,
      day: date,
    });

    if (!deletedProgress) {
      return res.json(new ApiError(404, null, "Progress not found"));
    }

    return res.json(
      new ApiResponse(200, { success: true }, "Progress deleted successfully")
    );
  } catch (error) {
    console.error("Error in deleteProgress:", error);
    return res.json(new ApiError(500, null, error.message));
  }
};
