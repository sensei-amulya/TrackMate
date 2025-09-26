import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  if (!password) {
    throw new ApiError(401, "Password is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    // Set cookie with the token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          // Don't send token in response body since it's in cookie
        },
        "Login successful"
      )
    );
  } else {
    res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid email or password"));
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => !field.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) throw new ApiError(400, "User already exists");

  const user = await User.create({ username, email, password });

  const token = generateToken(user._id);

  // Set cookie for registration too
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(201).json(
    new ApiResponse(
      200,
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        // Don't send token in response body since it's in cookie
      },
      "User registered successfully"
    )
  );
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json(new ApiResponse(200, null, "Logout successful"));
};

export { loginUser, registerUser, logoutUser };
