import { useMutation } from '@tanstack/react-query';
import { login, signup } from '../services/authService';

export const useLogin = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (loginData) => login(loginData),
    onSuccess
  });
};

export const useSignup = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (signupData) => signup(signupData),
    onSuccess
  });
};
