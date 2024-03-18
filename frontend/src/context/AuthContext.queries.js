import { useMutation } from '@tanstack/react-query';
import { login } from '../services/authService';

export const useLogin = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (loginData) => login(loginData),
    onSuccess
  });
};
