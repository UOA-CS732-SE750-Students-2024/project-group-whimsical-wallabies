import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { useLogin } from './AuthContext.queries';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const {
    mutate: login,
    error: loginErrors,
    isLoading: isLoadingLogin
  } = useLogin({
    onSuccess: ({ data: { user, token } }) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      setIsAuthenticated(true);
    }
  });
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
  };

  if (isLoadingLogin) return <div>Authenticating...</div>;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoadingLogin, setIsAuthenticated, login, loginErrors, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAuth() {
  return useContext(AuthContext);
}
