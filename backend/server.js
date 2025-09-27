import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import progressRoutes from "./routes/progress.routes.js";

// Load environment variables first
dotenv.config();

const app = express();

// Middleware setup (order is important!)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api", progressRoutes);
// Health check routes
app.get("/", (req, res) => {
  res.json("Progress Tracker API is running...");
});

// Connect to database and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server Running at Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
