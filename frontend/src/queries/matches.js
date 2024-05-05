import { useQuery } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

export function useGetPotentialMates() {
  return useQuery({
    queryKey: ['potential-mates'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get('/api/potential-mates');
      return data;
    }
  });
}
