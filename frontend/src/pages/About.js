import React from "react";

const About = () => {
  return (
    <div
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center blur-from-gray-/70"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
      }}
    >
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
      <div className="relative z-10 max-w-4xl text-left">
        <h2 className="text-4xl text-white font-bold mb-8 text-center">
          About TrackMate
        </h2>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-200 leading-relaxed text-lg mb-4">
            <span className="font-semibold text-white">TrackMate</span> is an
            innovative application designed to empower students, professionals,
            and fitness enthusiasts by providing a seamless way to monitor their
            progress. Whether you're tracking academic milestones, professional
            goals, or fitness achievements, TrackMate offers a{" "}
            <span className="text-blue-400 font-semibold">
              clean, intuitive interface
            </span>{" "}
            that makes goal management effortless.
          </p>
          <p className="text-gray-200 leading-relaxed text-lg">
            With its{" "}
            <span className="text-green-400 font-semibold">
              customizable tracking system
            </span>
            , users can set personalized goals, visualize their progress through
            insightful charts and analytics, and receive timely reminders to
            stay consistent. The app's focus on{" "}
            <span className="text-purple-400 font-semibold">
              motivation and accountability
            </span>{" "}
            ensures that users remain on track and celebrate their achievements,
            no matter how small.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h3 className="text-2xl text-white font-bold mb-4">Key Features:</h3>
          <ul className="text-gray-200 space-y-2 text-lg">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Goal tracking for academics, work, and fitness
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Customizable dashboards to suit individual preferences
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              Progress charts and performance analytics
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Reminders and motivational notifications
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
              Simple, user-friendly interface for easy navigation
            </li>
          </ul>
        </div>

        {/* About Creator */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
          <h3 className="text-2xl text-white font-bold mb-4">
            About the Creator:
          </h3>
          <p className="text-gray-200 leading-relaxed text-lg">
            TrackMate is developed by{" "}
            <span className="text-blue-400 font-bold">Amulya Gupta</span>, a
            passionate tech enthusiast dedicated to building solutions that
            enhance productivity and wellness. With a keen interest in app
            development and user-centered design, Amulya combines technology and
            simplicity to create tools that help people achieve their goals
            efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
