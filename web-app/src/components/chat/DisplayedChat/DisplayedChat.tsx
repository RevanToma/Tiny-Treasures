import React, { useState } from "react";
import { useChatById } from "../../../hooks/useChatById";
import { useParams } from "react-router-dom";
import Spinner from "../../common/spinner/spinner.component";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/userSelectors";

type Props = Record<string, never>;

const DisplayedChat: React.FC<Props> = () => {
  const user = useSelector(selectUser);
  const { id } = useParams();
  const [receiverId, setReceiverId] = useState<string | undefined>("");
  const roomId = id ?? "";

  const {
    data: room,
    isLoading,
    error,
  } = useChatById(roomId, setReceiverId, user._id);

  if (isLoading && roomId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!room || !user._id || !receiverId) return null;

  return <ChatRoom userId={user._id} room={room} receiverId={receiverId} />;
};

export default DisplayedChat;
