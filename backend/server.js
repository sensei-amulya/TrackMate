import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import signupRoute from "./routes/signupRoute.js";
import cookieParser from "cookie-parser";
import loginRoute from "./routes/loginRoute.js";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

import logoutRoute from "./routes/logoutRoute.js";
const app = express();
app.use(express.json());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json("Progress Tracker API is running...");
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy!" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server Running at Port ${process.env.PORT}`)
);
