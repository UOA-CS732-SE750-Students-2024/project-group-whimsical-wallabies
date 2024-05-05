import { useQuery } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

export function useGetWeather({ lat, lon }, options) {
  return useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(
        `/api/external/get-weather?lat=${lat}&lon=${lon}`
      );
      return data;
    },
    ...options
  });
}

export function useGetPlacesToWalkMyDog({ lat, lon }, options) {
  return useQuery({
    queryKey: ['placesToWalkMyDog', lat?.toFixed(4) || null, lon?.toFixed(4) || null],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(
        `http://localhost:3001/api/external/ask-chat-gpt?lat=${lat}&lon=${lon}`
      );
      return data;
    },
    ...options
  });
}
