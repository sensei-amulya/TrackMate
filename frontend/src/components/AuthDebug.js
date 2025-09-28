// components/AuthDebug.js
// Temporary component to help debug auth issues
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthDebug = () => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50 max-w-xs">
      <div className="font-bold mb-2">Auth Debug Info:</div>
      <div>Loading: {loading ? "✅" : "❌"}</div>
      <div>User exists: {user ? "✅" : "❌"}</div>
      <div>Authenticated: {isAuthenticated ? "✅" : "❌"}</div>
      {user && (
        <div className="mt-2">
          <div className="font-semibold">User Data:</div>
          <div>ID: {user._id || "N/A"}</div>
          <div>Username: {user.username || "N/A"}</div>
          <div>Email: {user.email || "N/A"}</div>
          <div>Name: {user.name || "N/A"}</div>
        </div>
      )}
    </div>
  );
};

export default AuthDebug;
