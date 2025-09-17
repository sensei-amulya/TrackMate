import mongoose from "mongoose";

const targetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    target: {
      type: Number,
      required: true,
    },
    catagory: {
      type: String,
      enum: ["Study", "Work", "Fitness", "Other"],
      default: "Other",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tracker", targetSchema);
