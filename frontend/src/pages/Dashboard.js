import React, { useState, useEffect, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Code2,
  Dumbbell,
  TrendingUp,
  Calendar,
  Target,
  Plus,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../api";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  // Console logs for current state
  // console.log("📊 Dashboard - User:", user);
  // console.log("📊 Dashboard - Progress Data:", progressData);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch progress data (Refactored for robust data parsing)
  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) {
        console.warn("⚠️ No user ID found, skipping fetch.");
        setLoading(false);
        setError("Please log in to view your progress.");
        return;
      }

      // In Dashboard.js, inside the 'Fetch progress data' useEffect

      // ... (inside fetchData = async () => { ... } )

      try {
        setLoading(true);
        console.log("🚀 Fetching progress for user:", user._id);

        // Assuming API.get() is using Axios and correctly handles HTTP errors
        const response = await API.get(`/${user._id}`);
        const apiResponseData = response.data;
        console.log("✅ API Response Data Structure:", apiResponseData);

        let fetchedProgress = [];

        // 1. Check for expected data array structure
        if (Array.isArray(apiResponseData)) {
          fetchedProgress = apiResponseData;
        } else if (
          apiResponseData?.success &&
          Array.isArray(apiResponseData.data)
        ) {
          fetchedProgress = apiResponseData.data;
        } else {
          // 2. If the response structure is unexpected, throw a **specific** error,
          //    but do NOT rely on a "success message" to determine failure.
          // The error "Progress retrieved successfully" is likely coming from
          // an API layer that returns an object like { message: "Progress retrieved successfully" }
          // when the 'data' field is empty or missing.

          // CRITICAL FIX: Only throw an error if we genuinely can't find the array data.
          if (!apiResponseData.data && !Array.isArray(apiResponseData)) {
            throw new Error(
              apiResponseData?.message ||
                "Received data in an unexpected format."
            );
          }
        }

        if (fetchedProgress.length > 0) {
          console.log(
            `✨ Successfully loaded ${fetchedProgress.length} progress records.`
          );
          setProgressData(fetchedProgress);
          setError("");
        } else {
          // If data is empty but API call succeeded, it's not a true error, just an empty state.
          setProgressData([]);
          setError(""); // Clear error to allow "No Progress Yet" state to show
        }
      } catch (err) {
        console.error(
          "❌ A true network or API failure occurred:",
          err.response?.data || err.message || err
        );
        setProgressData([]);

        // This handles cases where Axios throws an error for non-2xx statuses
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to load progress data due to network error.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
      // ...
    };

    fetchData();
  }, [user?._id]);

  // CRITICAL FIX: Added diagnostic logging for date matching
  const getChartData = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const chartData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = daysOfWeek[date.getDay()];
      const dateString = date.toISOString().split("T")[0]; // Expected format: YYYY-MM-DD

      const dayProgress = progressData.find((progress) => {
        if (!progress || !progress.day) return false;

        // DIAGNOSTIC LOG: Uncomment this line to see the comparison
        // console.log(`Comparing DB Day: ${progress.day} (type: ${typeof progress.day}) with Target Day: ${dateString}`);

        // Match by 'day' field (must be YYYY-MM-DD string)
        return progress.day === dateString;
      });

      chartData.push({
        day: dayName,
        questions: dayProgress?.dsa || 0,
        workout: dayProgress?.gym || 0,
        dsaGoal: 10,
        gymGoal: 60,
      });
    }

    return chartData;
  };

  let chartData = [];
  try {
    chartData = getChartData();
  } catch (err) {
    console.error("❌ Error generating chart data:", err);
    // Fallback to safe zero data
    chartData = Array(7).fill({
      day: "",
      questions: 0,
      workout: 0,
      dsaGoal: 10,
      gymGoal: 60,
    });
  }

  // Calculate stats safely
  const totalDsaQuestions = chartData.reduce(
    (sum, day) => sum + (day?.questions || 0),
    0
  );
  const totalGymMinutes = chartData.reduce(
    (sum, day) => sum + (day?.workout || 0),
    0
  );
  const dsaGoalAchieved = chartData.filter(
    (day) => (day?.questions || 0) >= (day?.dsaGoal || 10)
  ).length;
  const gymGoalAchieved = chartData.filter(
    (day) => (day?.workout || 0) >= (day?.gymGoal || 60)
  ).length;

  // Split data for charts
  const dsaData = chartData.map((day) => ({
    day: day?.day || "",
    questions: day?.questions || 0,
    goal: day?.dsaGoal || 10,
  }));

  const gymData = chartData.map((day) => ({
    day: day?.day || "",
    workout: day?.workout || 0,
    goal: day?.gymGoal || 60,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 shadow-lg">
          <p className="text-gray-300 font-medium">{`Day: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}${
                entry.dataKey === "workout" ? " min" : ""
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading your progress...</p>
        </div>
      </div>
    );
  }

  // Logged out state
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">
            Please log in to view your dashboard
          </p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg inline-block"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Progress Dashboard
                </h1>
                <p className="text-gray-400 text-sm">
                  Track your daily achievements
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/add-progress"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>Add Progress</span>
              </Link>
              <div className="text-right">
                <div className="text-white font-semibold">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="text-gray-400 text-sm">
                  {currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Error message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300 font-medium">⚠️ Error: {error}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-blue-400 text-sm font-semibold">
                THIS WEEK
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {totalDsaQuestions}
            </div>
            <div className="text-gray-400 text-sm">DSA Questions Solved</div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-semibold">
                THIS WEEK
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {totalGymMinutes}
            </div>
            <div className="text-gray-400 text-sm">Minutes Worked Out</div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-purple-400 text-sm font-semibold">
                DSA GOALS
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {dsaGoalAchieved}/7
            </div>
            <div className="text-gray-400 text-sm">Days Goal Achieved</div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-orange-400 text-sm font-semibold">
                GYM GOALS
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {gymGoalAchieved}/7
            </div>
            <div className="text-gray-400 text-sm">Days Goal Achieved</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* DSA Questions Chart */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  DSA Questions Progress
                </h3>
                <p className="text-gray-400 text-sm">
                  Daily questions solved vs goal (10/day)
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dsaData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="goal"
                  fill="#6B7280"
                  name="Goal"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="questions"
                  fill="#3B82F6"
                  name="Questions Solved"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gym Goals Chart */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Gym Workout Progress
                </h3>
                <p className="text-gray-400 text-sm">
                  Daily workout time vs goal (60 min/day)
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={gymData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="goal"
                  fill="#6B7280"
                  name="Goal (min)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="workout"
                  fill="#10B981"
                  name="Workout Time (min)"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Empty state (Only show if progressData is empty AND there's no error) */}
        {progressData.length === 0 && !loading && !error && (
          <div className="text-center py-12 mt-8">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Progress Yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start tracking your progress today!
            </p>
            <Link
              to="/add-progress"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Progress</span>
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Keep pushing your limits! Consistency is the key to success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
