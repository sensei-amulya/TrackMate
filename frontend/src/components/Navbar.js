import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserCircle } from "lucide-react";
//import axios from "axios";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  console.log("username", user);
  // Close dropdown on outside click

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDisplayName = (user) => {
    if (!user) return null;

    // Try different possible property names
    return user || "User";
  };
  useEffect(() => {
    console.log("Navbar user object:", user);
    console.log("User keys:", user ? Object.keys(user) : "No user");
    console.log("Display name:", getDisplayName(user));
  }, [user]);

  const displayName = getDisplayName(user);

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md px-6 py-2
     flex justify-between items-center z-50"
    >
      {/* Left side - Logo */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TrackMate
        </Link>
        <Link
          to="/about"
          className="text-gray-300 hover:text-blue-400 transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-gray-300 hover:text-blue-400 transition"
        >
          Contact
        </Link>
      </div>

      {/* Middle - Nav links */}

      {/* Right side - Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center focus:outline-none hover:bg-gray-50 rounded-lg p-2 transition"
        >
          <UserCircle
            size={32}
            className="text-gray-700 hover:text-blue-600 transition"
          />
          {user && displayName && (
            <span className="font-medium text-white max-w-32 truncate">
              {displayName}
            </span>
          )}
          {user && !displayName && (
            <span className="font-medium text-gray-500 text-sm">Account</span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-50">
            {user ? (
              <>
                {displayName && (
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-white truncate mb-1 text-lg">
                      {displayName}
                    </p>
                    {user.email && (
                      <p className="text-sm text-white truncate">
                        {user.email}
                      </p>
                    )}
                  </div>
                )}

                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-blue-500 transition"
                >
                  Dashboard
                </Link>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-blue-500 transition "
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-blue-500 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
