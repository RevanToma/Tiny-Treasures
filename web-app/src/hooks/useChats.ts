import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../api/requests";

export const useChats = (userId: string) => {
  return useQuery({
    queryFn: () => fetchChats(userId),
    queryKey: [fetchChats.name],
    enabled: !!userId,
  });
};
