import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { LoadingWrapper } from '../components/common/LoadingWrapper';
import { tokenStorage, userDataStorage } from '../utils/localStorageNames';
import { useLogin } from './AuthContext.queries';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenStorage.get());
  const {
    mutate: login,
    error: loginErrors,
    isPending: isPendingLogin
  } = useLogin(({ data: { user, token } }) => {
    tokenStorage.save(token);
    userDataStorage.save(user);
    setIsAuthenticated(true);
  });
  const logout = () => {
    tokenStorage.remove();
    userDataStorage.remove();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isPendingLogin,
        setIsAuthenticated,
        login,
        loginErrors,
        logout
      }}
    >
      <LoadingWrapper isLoading={isPendingLogin} customMessage="Authenticating...">
        {children}
      </LoadingWrapper>
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAuth() {
  return useContext(AuthContext);
}
