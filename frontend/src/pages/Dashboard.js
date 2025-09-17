import React, { useState, useEffect } from "react";
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
import { Code2, Dumbbell, TrendingUp, Calendar, Target } from "lucide-react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data for DSA questions (last 7 days)
  const dsaData = [
    { day: "Mon", questions: 8, goal: 10 },
    { day: "Tue", questions: 12, goal: 10 },
    { day: "Wed", questions: 6, goal: 10 },
    { day: "Thu", questions: 15, goal: 10 },
    { day: "Fri", questions: 9, goal: 10 },
    { day: "Sat", questions: 14, goal: 10 },
    { day: "Sun", questions: 11, goal: 10 },
  ];

  // Sample data for gym goals (last 7 days)
  const gymData = [
    { day: "Mon", workout: 90, goal: 60 },
    { day: "Tue", workout: 45, goal: 60 },
    { day: "Wed", workout: 75, goal: 60 },
    { day: "Thu", workout: 0, goal: 60 },
    { day: "Fri", workout: 85, goal: 60 },
    { day: "Sat", workout: 120, goal: 60 },
    { day: "Sun", workout: 60, goal: 60 },
  ];

  const totalDsaQuestions = dsaData.reduce(
    (sum, day) => sum + day.questions,
    0
  );
  const totalGymMinutes = gymData.reduce((sum, day) => sum + day.workout, 0);
  const dsaGoalAchieved = dsaData.filter(
    (day) => day.questions >= day.goal
  ).length;
  const gymGoalAchieved = gymData.filter(
    (day) => day.workout >= day.goal
  ).length;

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
            <div className="text-right">
              <div className="text-white font-semibold">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-gray-400 text-sm">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

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
