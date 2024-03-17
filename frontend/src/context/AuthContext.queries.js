import { useMutation } from 'react-query';
import { login } from '../services/authService';

export const useLogin = (options = {}) => {
  return useMutation((loginData) => login(loginData), options);
};
