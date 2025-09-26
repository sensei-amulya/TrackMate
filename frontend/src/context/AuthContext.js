import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user already logged in when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        console.log("Auth check response:", res.data); // Debug log

        // The /me endpoint returns { user: {...} }
        setUser(res.data.user);
      } catch (error) {
        console.log("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData,
        { withCredentials: true }
      );

      console.log("Login response:", res.data); // Debug log

      // After successful login, set user from response data
      // Your ApiResponse structure: { statusCode, data: { _id, username, email }, message }
      setUser(res.data.data);

      return { success: true, data: res.data };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
      // Even if logout fails, clear user from context
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
        loading,
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
