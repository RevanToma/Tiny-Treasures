import { useQuery } from "@tanstack/react-query";
import { fetchChatById } from "../api/requests";
import { IChatRoom } from "../types";

export const useChatById = (
  roomId: string,
  setReceiverId: React.Dispatch<React.SetStateAction<string | undefined>>,
  userId: string | undefined
) => {
  return useQuery({
    queryFn: () => fetchChatById(roomId),
    queryKey: [fetchChatById.name, roomId],
    enabled: !!roomId,
    onSuccess: (data: IChatRoom) => {
      console.log(data.members);
      const switchedReceiverId = data.members.find(
        (member) => member !== userId
      );
      if (switchedReceiverId) {
        setReceiverId(switchedReceiverId);
      }
    },
  });
};
