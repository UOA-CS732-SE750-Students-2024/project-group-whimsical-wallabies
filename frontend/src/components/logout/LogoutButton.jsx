import React from "react";
import { useNavigate } from "react-router-dom"; // If you want to redirect after logout
import { useAuth } from "../../context/AuthContext";
import { APPLICATION_PATH } from "../../utils/urlRoutes";

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth();
  let navigate = useNavigate(); // For redirecting after logout

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate(APPLICATION_PATH.auth.login); // Redirect to login page or any other page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
