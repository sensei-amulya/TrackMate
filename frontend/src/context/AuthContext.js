import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
          timeout: 5000, // 5 second timeout
        });
        console.log("Auth check response:", res.data);

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

  // Memoized login handler to prevent recreating on every render
  const handleLogin = useCallback(async (loginData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData,
        {
          withCredentials: true,
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("Login response:", res.data);

      // After successful login, set user from response data
      // Your ApiResponse structure: { statusCode, data: { _id, username, email }, message }
      setUser(res.data.data);

      return { success: true, data: res.data };
    } catch (error) {
      console.error("Login failed:", error);

      let errorMessage = "Login failed";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please try again.";
      } else if (!error.response) {
        errorMessage = "Network error. Please check your connection.";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }, []);

  // Memoized logout handler
  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          withCredentials: true,
          timeout: 5000,
        }
      );
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
      // Even if logout fails, clear user from context
      setUser(null);
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Memoized context value to prevent unnecessary re-renders of child components
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      handleLogin,
      handleLogout,
      loading,
      isAuthenticated: !!user,
    }),
    [user, handleLogin, handleLogout, loading]
  );

  // Optimized loading screen
  const LoadingScreen = useMemo(
    () => (
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
    ),
    []
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? LoadingScreen : children}
    </AuthContext.Provider>
  );
};
