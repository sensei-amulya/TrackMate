import axios from "axios";

// Create axios instance with optimized defaults
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Simple in-memory cache for GET requests
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Request interceptor for auth + cache lookup
API.interceptors.request.use(
  (config) => {
    // Attach token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle GET caching
    if (config.method === "get") {
      config.cacheKey = `${config.url}_${JSON.stringify(config.params || {})}`;
      const cachedData = cache.get(config.cacheKey);

      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        // Return cached response-like object
        return Promise.resolve({
          data: cachedData.data,
          config,
          cached: true,
        });
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for caching + error handling
API.interceptors.response.use(
  (response) => {
    // Cache GET responses
    if (response.config.method === "get" && response.config.cacheKey) {
      cache.set(response.config.cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
    }
    return response;
  },
  (error) => {
    // Handle network / timeout / server errors
    if (error.code === "ECONNABORTED") {
      error.message = "Request timed out. Please try again.";
    } else if (!error.response) {
      error.message = "Network error. Please check your connection.";
    } else {
      const status = error.response.status;
      switch (status) {
        case 401:
          localStorage.removeItem("token");
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

// Utility: Clear cache function
export const clearCache = (pattern) => {
  if (pattern) {
    for (const [key] of cache.entries()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};

// Utility: Preload progress data into cache
export const preloadProgressData = async (userId) => {
  try {
    await API.get(`/progress/${userId}`);
  } catch (error) {
    console.warn("Failed to preload progress data:", error.message);
  }
};

export default API;
