import React from "react";
import { UserCircle } from "lucide-react"; // uses lucide-react icons

const ProfileIcon = () => {
  return (
    <button className="flex items-center space-x-2 hover:text-blue-600">
      <UserCircle size={28} />
      <span className="hidden md:inline">Profile</span>
    </button>
  );
};

export default ProfileIcon;
