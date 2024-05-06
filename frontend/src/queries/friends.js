import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

export function useGetFriends() {
  return useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get('/api/match');
      return data;
    }
  });
}

// export function useUnfriendMutation() {
//   return useMutation({
//     mutationKey: ['unfriend'],
//     mutation: async
//   });
// }

export function useLikeDogMutation() {
  return useMutation({
    mutationKey: ['likeDog'],
    mutationFn: async (dogId) => {
      const { data } = await axiosApiInstance.post(`/api/match/${dogId}`);
      return data;
    },
    onSuccess: () => {
      // Handle any actions upon success, e.g., showing a notification
      console.log('Dog liked successfully.');
    },
    onError: (error) => {
      // Handle any errors
      console.error('Error liking the dog:', error);
    }
  });
}

export function useUnlikeDogMutation() {
  return useMutation({
    mutationKey: ['unlikeDog'],
    mutationFn: async (dogId) => {
      const { data } = await axiosApiInstance.delete(`/api/match/${dogId}`);
      return data;
    },
    onSuccess: () => {
      console.log('Dog unliked successfully.');
    },
    onError: (error) => {
      console.error('Error unliking the dog:', error);
    }
  });
}
