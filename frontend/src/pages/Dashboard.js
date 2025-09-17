import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log("Dashboard user:", user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Welcome {user} 🎉
        </h1>
        <p className="text-center text-gray-600 mb-6">
          This is your personal dashboard. Track your progress here!
        </p>

        {/* Placeholder for future progress tracker */}
        <div className="border rounded-xl p-6 bg-gray-100 text-center">
          <p className="text-gray-500">📊 Your progress will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
