import { useQuery } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

const fetchUserProfileById = async (userId) => {
  const { data } = await axiosApiInstance.get(`/api/user/${userId}/profile`);
  return data;
};

export const useGetUserProfile = (userId) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfileById(userId),
    enabled: !!userId
  });
};
