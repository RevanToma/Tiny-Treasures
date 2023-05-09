import { useQuery } from "@tanstack/react-query";
import { fetchUserNameById } from "../api/requests";

export const useUserName = (id: string) => {
  return useQuery({
    queryFn: () => fetchUserNameById(id),
    queryKey: [fetchUserNameById.name],
    enabled: !!id,
  });
};
