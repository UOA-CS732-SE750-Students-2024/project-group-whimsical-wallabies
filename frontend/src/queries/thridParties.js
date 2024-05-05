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
