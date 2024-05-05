import { useQuery, useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

export function useGetUser(username) {
  return useQuery({
    queryKey: ['user', 'profile'],
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
