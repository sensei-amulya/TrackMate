import React from "react";

const Home = () => {
  const features = [
    "Track goals across multiple categories",
    "Visual progress analytics",
    "Real-time performance insights",
    "Customizable dashboards",
  ];

  return (
    <div
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      {/* CSS-based background charts */}
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
      <div className="relative z-10 flex items-center justify-center py-20 px-6 pb-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome section */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-6 py-2 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">
                Welcome to TrackMate
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                One-Stop Solution
              </span>{" "}
              for Progress Tracking
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our platform empowers users to track progress across all aspects
              of life. Whether you're mastering DSA, hitting professional
              targets, or achieving fitness goals, we provide the tools and
              insights you need to succeed.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                <span className="text-gray-200">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-500/25">
              Get Started Free
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>

          {/* Stats section */}
          <div className="mt-16 mb-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50M+</div>
              <div className="text-gray-400">Goals Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
