import { useQuery } from '@tanstack/react-query';
import { fetchEnums } from '../api/requests';

export const useEnums = () => {
  return useQuery({
    queryKey: ['enums'],
    queryFn: fetchEnums,
    refetchOnWindowFocus: false,
  });
};
