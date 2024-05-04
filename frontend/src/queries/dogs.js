import { useQuery, useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

export function useGetDogs() {
  return useQuery({
    queryKey: ['me', 'dogs'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get('/api/dog');
      return data;
    }
  });
}

export function useGetDogById(dogId, options = {}) {
  return useQuery({
    queryKey: ['dogs', dogId],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(`/api/dog/${dogId}`);
      return data;
    },
    ...options
  });
}

export function useUpdateDogMutation(dogId, options) {
  return useMutation({
    mutationFn: async (updatedDog) => {
      const { data } = await axiosApiInstance.put(`/api/dog/${dogId}`, updatedDog);
      return data;
    },
    ...options
  });
}

export function useCreateDogMutation(options) {
  return useMutation({
    mutationFn: async (newDog) => {
      const { data } = await axiosApiInstance.post('/api/dog', newDog);
      return data;
    },
    ...options
  });
}
export function useUploadDogProfilePictureMutation(options) {
  return useMutation({
    mutationFn: async ({ dogId, profilePicture }) => {
      const uploadData = new FormData();
      uploadData.append('profilePicture', profilePicture);
      const { data } = await axiosApiInstance.put(`/api/dog/${dogId}`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return data;
    },
    ...options
  });
}

export function useDeleteDogMutation(options) {
  return useMutation({
    mutationFn: async (dogId) => {
      const { data } = await axiosApiInstance.delete(`/api/dog/${dogId}`);
      return data;
    },
    ...options
  });
}
