import { useMutation } from '@tanstack/react-query';
import { login, signup } from '../services/authService';

export const useLoginMutation = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (loginData) => login(loginData),
    onSuccess
  });
};

export const useSignupMutation = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (signupData) => signup(signupData),
    onSuccess
  });
};
