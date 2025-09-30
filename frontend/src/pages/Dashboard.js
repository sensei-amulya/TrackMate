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

  console.log("📊 Dashboard - User ID:", user?._id);
  console.log("📊 Dashboard - Progress Data Length:", progressData.length);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch progress data only once when component mounts or user changes
  useEffect(() => {
    console.log("📡 Dashboard - Fetching progress data...");

    const fetchData = async () => {
      if (!user?._id) {
        console.log("❌ No user ID found");
        setLoading(false);
        setError("Please log in to view your progress");
        return;
      }

      try {
        setLoading(true);
        console.log("🚀 Making API request for user:", user._id);

        const response = await API.get(`/progress/${user._id}`);
        console.log("✅ API Response:", response.data);

        if (response.data?.success) {
          setProgressData(response.data.data || []);
          setError("");
        } else {
          setError(response.data?.message || "Failed to fetch progress data");
        }
      } catch (err) {
        console.error("❌ Error fetching progress:", err);
        setError(err.response?.data?.message || "Failed to load progress data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?._id]); // Only re-run when user ID changes

  // Transform data for charts (simple version)
  const getChartData = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const chartData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = daysOfWeek[date.getDay()];
      const dateString = date.toISOString().split("T")[0];

      const dayProgress = progressData.find((progress) => {
        const progressDate = new Date(progress.createdAt)
          .toISOString()
          .split("T")[0];
        return progressDate === dateString;
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

  const chartData = getChartData();

  // Calculate stats
  const totalDsaQuestions = chartData.reduce(
    (sum, day) => sum + day.questions,
    0
  );
  const totalGymMinutes = chartData.reduce((sum, day) => sum + day.workout, 0);
  const dsaGoalAchieved = chartData.filter(
    (day) => day.questions >= day.dsaGoal
  ).length;
  const gymGoalAchieved = chartData.filter(
    (day) => day.workout >= day.gymGoal
  ).length;

  // Split data for charts
  const dsaData = chartData.map((day) => ({
    day: day.day,
    questions: day.questions,
    goal: day.dsaGoal,
  }));

  const gymData = chartData.map((day) => ({
    day: day.day,
    workout: day.workout,
    goal: day.gymGoal,
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
            <p className="text-red-300">{error}</p>
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

        {/* Empty state */}
        {progressData.length === 0 && !loading && !error && (
          <div className="text-center py-12">
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
