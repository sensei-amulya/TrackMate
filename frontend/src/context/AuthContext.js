import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  const navigate = useNavigate();

  console.log(
    "🔥 AuthProvider render - User:",
    !!user,
    "Loading:",
    loading,
    "Initialized:",
    authInitialized
  );

  // Check auth only once when app loads
  useEffect(() => {
    if (authInitialized) return; // Prevent multiple calls

    console.log("🔍 Checking initial auth...");

    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
          timeout: 5000,
        });

        console.log("✅ Auth check response:", res.data);

        if (res.data.success && res.data.data) {
          setUser(res.data.data);
        } else if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(
          "❌ Auth check failed:",
          error.response?.status || error.message
        );
        setUser(null);
      } finally {
        setAuthInitialized(true);
        setLoading(false);
        console.log("🏁 Auth check complete");
      }
    };

    checkAuth();
  }, [authInitialized]); // Only depend on initialization flag

  // Login function
  const handleLogin = async (loginData) => {
    console.log("🚀 Login attempt...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData,
        { withCredentials: true, timeout: 10000 }
      );

      console.log("✅ Login success:", res.data);

      if (res.data?.data) {
        setUser(res.data.data);
        console.log(
          "👤 User logged in:",
          res.data.data.email || res.data.data.username
        );

        // Navigate after a small delay
        setTimeout(() => {
          console.log("🎯 Redirecting to dashboard...");
          navigate("/dashboard", { replace: true });
        }, 100);

        return { success: true, data: res.data };
      }

      return { success: false, error: "No user data received" };
    } catch (error) {
      console.error("❌ Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Logout function
  const handleLogout = async () => {
    console.log("🚪 Logging out...");

    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
          timeout: 5000,
        }
      );
    } catch (err) {
      console.error("Logout API failed:", err.message);
    }

    setUser(null);
    setAuthInitialized(false); // Reset for next auth check
    navigate("/login", { replace: true });
  };

  // Simple context value - no memoization to avoid dependency issues
  const contextValue = {
    user,
    setUser,
    handleLogin,
    handleLogout,
    loading,
    isAuthenticated: !!user,
    authInitialized,
  };

  // Show loading screen only during initial auth check
  if (loading && !authInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">
            Loading TrackMate...
          </div>
          <div className="text-gray-400 text-sm mt-2">
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
