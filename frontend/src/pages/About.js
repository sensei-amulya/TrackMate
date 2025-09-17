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
      <h2 className="text-3xl text-white font-bold mb-4">About TrackMate </h2>
      <p className="text-gray-700 leading-relaxed">
        TrackMate is designed to help students, professionals, and fitness
        enthusiasts monitor their progress. Our clean interface and customizable
        tracking system ensures you stay motivated and on top of your goals.
      </p>
    </div>
  );
};

export default About;
