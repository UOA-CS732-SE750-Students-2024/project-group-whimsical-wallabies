import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { tokenStorage, userDataStorage } from '../utils/localStorageNames';
import { useLoginMutation, useSignupMutation, useUpdateUserMutation } from './AuthContext.queries';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenStorage.get());
  const [isSignup, setIsSignup] = useState(false);
  const [currentUser, setUser] = useState(() => {
    if (userDataStorage.get()) {
      return userDataStorage.get();
    }
  });

  const {
    mutate: login,
    error: loginErrors,
    isPending: isPendingLogin
  } = useLoginMutation(({ data: { user, token } }) => {
    tokenStorage.save(token);
    userDataStorage.save(user);
    setUser(user);
    setIsAuthenticated(true);
  });
  const {
    mutate: signup,
    error: signupErrors,
    isPending: isPendingSignup
  } = useSignupMutation(() => {
    setIsSignup(true);
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
        logout,
        signup,
        signupErrors,
        isSignup,
        isPendingSignup,
        setIsSignup,
        currentUser,
        setUser,
        updateUserProfile,
        updateUserProfileErrors,
        isPendinguserProfileUpdate
      }}
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
