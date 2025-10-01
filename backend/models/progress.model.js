import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    day: {
      type: String,
      required: true,
      // Format: YYYY-MM-DD
    },
    dsa: {
      type: Number,
      default: 0,
      min: 0,
    },
    gym: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to prevent duplicate entries for same user and day
progressSchema.index({ userId: 1, day: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);
