import { useQuery, useMutation } from '@tanstack/react-query';
import { login, signup } from '../services/authService';
import axiosApiInstance from '../utils/axiosApiInstance';

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

export function useGetUser(username) {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(`/api/user/${username}`);
      return data;
    }
  });
}

export const useUpdateUserMutation = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (profileData) => {
      console.log(profileData);
      return axiosApiInstance.put(`/api/user/${profileData.username}`, profileData);
    },
    onSuccess
  });
};
