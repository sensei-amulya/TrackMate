import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Dumbbell,
  Plus,
  Calendar,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";

const AddProgress = () => {
  const [formData, setFormData] = useState({
    day: new Date().toISOString().split("T")[0], // Today's date
    dsa: "",
    gym: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      setError("User not found. Please login again.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const submitData = {
        userId: user._id,
        day: formData.day,
        dsa: parseInt(formData.dsa) || 0,
        gym: parseInt(formData.gym) || 0,
      };

      const response = await API.post("/", submitData);

      if (response.data.success) {
        setMessage("Progress added successfully! 🎉");

        // Reset form
        setFormData({
          day: new Date().toISOString().split("T")[0],
          dsa: "",
          gym: "",
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(response.data.message || "Failed to add progress");
      }
    } catch (err) {
      console.error("Error adding progress:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add progress. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Background visual elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Pie Chart 1 */}
        <div className="absolute top-20 left-10 w-32 h-32">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#3B82F6 0deg 234deg, #10B981 234deg 324deg, #F59E0B 324deg 360deg)`,
              }}
            ></div>
            <div className="absolute inset-4 bg-gray-900 rounded-full"></div>
          </div>
        </div>

        {/* Bar Chart 1 */}
        <div className="absolute top-40 right-20 flex items-end space-x-2 opacity-20">
          <div className="w-6 h-16 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-24 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-32 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-20 bg-blue-600 rounded-t"></div>
        </div>

        {/* Pie Chart 2 */}
        <div className="absolute bottom-32 left-20 w-36 h-36">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#8B5CF6 0deg 144deg, #06B6D4 144deg 270deg, #F97316 270deg 360deg)`,
              }}
            ></div>
            <div className="absolute inset-6 bg-gray-900 rounded-full"></div>
          </div>
        </div>

        {/* Bar Chart 2 */}
        <div className="absolute bottom-20 right-32 flex items-end space-x-2 opacity-15">
          <div className="w-4 h-12 bg-green-500 rounded-t"></div>
          <div className="w-4 h-18 bg-green-500 rounded-t"></div>
          <div className="w-4 h-28 bg-green-500 rounded-t"></div>
          <div className="w-4 h-24 bg-green-500 rounded-t"></div>
          <div className="w-4 h-32 bg-green-500 rounded-t"></div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-1/3 right-10 w-24 h-24 border-2 border-purple-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 border-2 border-blue-400 rounded-lg rotate-45 opacity-15"></div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-gray-900/50"></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center py-20 px-6 min-h-screen">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Add Today's Progress
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              Track your daily achievements and stay consistent with your goals
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          {/* Form */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-600 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div>
                <label
                  htmlFor="day"
                  className="flex items-center space-x-2 text-white font-semibold text-lg mb-4"
                >
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]} // Can't select future dates
                  required
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300"
                />
              </div>

              {/* DSA Progress */}
              <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                <label
                  htmlFor="dsa"
                  className="flex items-center space-x-3 text-white font-semibold text-lg mb-4"
                >
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>DSA Questions Solved</span>
                </label>
                <input
                  type="number"
                  id="dsa"
                  name="dsa"
                  value={formData.dsa}
                  onChange={handleChange}
                  min="0"
                  placeholder="Enter number of DSA questions solved"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
                <p className="text-blue-300 text-sm mt-2 flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Daily Goal: 10 questions</span>
                </p>
              </div>

              {/* Gym Progress */}
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                <label
                  htmlFor="gym"
                  className="flex items-center space-x-3 text-white font-semibold text-lg mb-4"
                >
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-green-400" />
                  </div>
                  <span>Gym Workout (Minutes)</span>
                </label>
                <input
                  type="number"
                  id="gym"
                  name="gym"
                  value={formData.gym}
                  onChange={handleChange}
                  min="0"
                  placeholder="Enter workout time in minutes"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
                <p className="text-green-300 text-sm mt-2 flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Daily Goal: 60 minutes</span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Progress...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add Progress</span>
                  </>
                )}
              </button>
            </form>

            {/* Success Message */}
            {message && (
              <div className="mt-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-green-300 text-center font-medium">
                  {message}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-300 text-center">{error}</p>
              </div>
            )}

            {/* Tips */}
            <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span>Pro Tips</span>
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span>Track your progress daily for the best insights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Even small progress counts - consistency is key</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Set realistic goals and gradually increase them</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProgress;
