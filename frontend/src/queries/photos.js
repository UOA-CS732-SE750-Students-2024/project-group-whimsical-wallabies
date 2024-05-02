import { useQuery, useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

export function useGetPhotos(dogId) {
  return useQuery({
    queryKey: ['dogs', dogId, 'photos'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(`/api/dog/${dogId}/photos`);
      return data;
    }
  });
}

export function useCreatePhotoMutation(dogId) {
  return useMutation({
    mutationFn: async (newPhoto) => {
      const { data } = await axiosApiInstance.post(`/api/dog/${dogId}/photos`, newPhoto);
      return data;
    }
  });
}

export function useDeletePhotoMutation(dogId) {
  return useMutation({
    mutationFn: async (photoId) => {
      const { data } = await axiosApiInstance.delete(`/api/dog/${dogId}photo/${photoId}`);
      return data;
    }
  });
}
