import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiPostSignInUser, fetchChats } from "../api/requests";

export const useChats = (userId: string) => {
  return useQuery({
    queryFn: () => fetchChats(userId),
    queryKey: [fetchChats.name],
    enabled: !!userId,
  });
};
