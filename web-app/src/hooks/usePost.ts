import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../api/requests';

export const usePost = (id: string | undefined) => {
  return useQuery({
    queryFn: () => fetchPostById(id),
    queryKey: ['post', id],
    enabled: !!id && id.length > 1,
  });
};
