import axios from "axios";

// Create axios instance with optimized defaults
const API = axios.create({
  baseURL: "https://trackmate-backend-prqa.onrender.com/api/progress", // VERIFIED: Endpoint is progress
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// REMOVED: Caching variables (cache, CACHE_DURATION)

// Request interceptor for auth only
API.interceptors.request.use(
  (config) => {
    // 1. Attach token here if necessary (you had this commented out)
    // const token = localStorage.getItem('token');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    // 2. Removed all Caching logic from the request interceptor
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling only
API.interceptors.response.use(
  (response) => {
    // Removed all Caching logic from the response interceptor
    return response;
  },
  (error) => {
    // Handle network / timeout / server errors (Logic remains the same)
    if (error.code === "ECONNABORTED") {
      error.message = "Request timed out. Please try again.";
    } else if (!error.response) {
      // THIS IS WHERE YOUR "Network error. Please check your connection." COMES FROM
      error.message = "Network error. Please check your connection.";
    } else {
      const status = error.response.status;
      switch (status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          error.message = "Access forbidden. Please check your permissions.";
          break;
        case 404:
          error.message = "Resource not found.";
          break;
        case 500:
          error.message = "Server error. Please try again later.";
          break;
        default:
          error.message =
            error.response.data?.message || "Something went wrong.";
      }
    }
    return Promise.reject(error);
  }
);

// Utility functions are now useless without the cache map, but are kept for structure
export const clearCache = (pattern) => {
  console.warn(
    "clearCache called, but caching is currently disabled in API.js."
  );
};

export const preloadProgressData = async (userId) => {
  console.log(`Preloading skipped for ${userId} to avoid race conditions.`);
  return;
};

export default API;

