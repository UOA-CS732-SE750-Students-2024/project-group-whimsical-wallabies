import { useQuery } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

export function useGetPotentialMates(manualMatch = false) {
  return useQuery({
    queryKey: ['potential-mates', manualMatch],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get('/api/potential-mates', {
        params: {
          manualMatch
        }
      });
      return data;
    }
  });
}
