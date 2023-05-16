import React, { useState } from "react";
import { useChatById } from "../../../hooks/useChatById";
import { useParams } from "react-router-dom";
import Spinner from "../../common/spinner/spinner.component";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/userSelectors";
import { usePost } from "../../../hooks/usePost";

type Props = Record<string, never>;

const DisplayedChat: React.FC<Props> = () => {
  const user = useSelector(selectUser);
  const { roomId: id, postId: pId } = useParams();
  const postId = pId ?? "";
  const [receiverId, setReceiverId] = useState<string | undefined>("");
  const roomId = id ?? "";

  const { data: post, isLoading: postIsLoading } = usePost(postId);

  const {
    data: room,
    isLoading: chatIsLoading,
    error,
  } = useChatById(roomId, setReceiverId, user._id);

  if ((chatIsLoading && roomId) || postIsLoading) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!room || !user._id || !receiverId || !post) return null;

  console.log("displayedchat", post);

  return (
    <ChatRoom
      key={room._id}
      post={post}
      userId={user._id}
      room={room}
      receiverId={receiverId}
    />
  );
};

export default DisplayedChat;
