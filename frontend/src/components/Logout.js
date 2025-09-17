import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogout = () => {
    handleLogout();
    navigate("/login");
  };

  return <button onClick={handlelogout}>Logout</button>;
};

export default Logout;
