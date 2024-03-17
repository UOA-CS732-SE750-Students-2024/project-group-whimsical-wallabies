import React from 'react';
import { useNavigate } from 'react-router-dom'; // If you want to redirect after logout
import { useAuth } from '../../context/AuthContext';

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth();
  let navigate = useNavigate(); // For redirecting after logout

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page or any other page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
