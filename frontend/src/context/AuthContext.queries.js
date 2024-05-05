import { useMutation } from '@tanstack/react-query';
import { login, signup } from '../services/authService';

export const useLoginMutation = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (loginData) => login(loginData),
    onSuccess
  });
};

/**
 * Mutation to signup a user
 * @param {Object} onSuccess - Function to run on successful signup
 * @returns {Object} - Mutation object
 */
export const useSignupMutation = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (signupData) => signup(signupData),
    onSuccess
  });
};
