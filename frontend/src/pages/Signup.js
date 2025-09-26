import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        form,
        {
          withCredentials: true,
        }
      );
      navigate("/api/users/login", { replace: true });
      setMessage(res.data.message || "Signup successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/75"></div>
      <div className="absolute inset-0 opacity-10">
        {/* Pie Chart */}
        <div className="absolute top-20 left-10 w-32 h-32">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#3B82F6 0deg 216deg, #10B981 216deg 288deg, #F59E0B 288deg 360deg)`,
              }}
            ></div>
            <div className="absolute inset-4 bg-transparent rounded-full"></div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="absolute top-1/3 right-16 flex items-end space-x-2 opacity-20">
          <div className="w-4 h-12 bg-blue-500 rounded-t"></div>
          <div className="w-4 h-20 bg-blue-500 rounded-t"></div>
          <div className="w-4 h-16 bg-blue-500 rounded-t"></div>
          <div className="w-4 h-24 bg-blue-500 rounded-t"></div>
        </div>

        {/* Progress circles */}
        <div className="absolute bottom-20 left-20 w-20 h-20 border-4 border-purple-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 border-4 border-green-400 rounded-full opacity-15"></div>

        {/* Line graph simulation */}
        <div className="absolute top-1/2 left-1/4 w-32 h-20 opacity-15">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <polyline
              fill="none"
              stroke="#06B6D4"
              strokeWidth="2"
              points="0,40 20,25 40,30 60,15 80,20 100,10"
            />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">TM</span>
            </div>
            <span className="text-2xl font-bold text-white">TrackMate</span>
          </div>
          <p className="text-gray-300 text-sm">
            Welcome back! Please sign in to your account
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
          {message && (
            <p className="text-center text-sm mt-4 text-red-500">{message}</p>
          )}
          <p className="text-sm text-center mt-6 text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
