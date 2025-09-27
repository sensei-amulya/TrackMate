import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: { type: String, required: true }, // "Mon", "Tue", etc.

  dsa: {
    questions: { type: Number, default: 0 },
    goal: { type: Number, default: 10 },
  },

  gym: {
    workout: { type: Number, default: 0 },
    goal: { type: Number, default: 60 },
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Progress", progressSchema);
