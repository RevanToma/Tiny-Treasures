import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../api/requests";

export const usePost = (id: string) => {
  return useQuery({
    queryFn: () => fetchPostById(id),
    queryKey: [fetchPostById.name],
    enabled: id.length > 1,
  });
};
