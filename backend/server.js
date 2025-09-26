import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server Running at Port ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

//
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json("Progress Tracker API is running...");
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy!" });
});
