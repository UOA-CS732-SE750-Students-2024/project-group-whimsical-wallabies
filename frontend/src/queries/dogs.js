import { useQuery, useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

export function useGetDogs() {
  return useQuery({
    queryKey: ['dogs'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get('/api/dog');
      return data;
    }
  });
}

export function useUpdateDogMutation() {
  return useMutation({
    mutationFn: async (updatedDog) => {
      const { data } = await axiosApiInstance.put(`/api/dog/${updatedDog.id}`, updatedDog);
      return data;
    }
  });
}

export function useCreateDogMutation() {
  return useMutation({
    mutationFn: async (newDog) => {
      const { data } = await axiosApiInstance.post('/api/dog', newDog);
      return data;
    }
  });
}

export function useDeleteDogMutation() {
  return useMutation({
    mutationFn: async (dogId) => {
      const { data } = await axiosApiInstance.delete(`/api/dog/${dogId}`);
      return data;
    }
  });
}
