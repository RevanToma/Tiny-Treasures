import { useParams } from "react-router-dom";
import { usePost } from "../../../hooks/usePost";
import Spinner from "../../../components/common/spinner/spinner.component";
import Box from "../../../components/common/Box/Box";
import * as S from "./styled";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import Button from "../../../components/common/Button/Button.component";
import { ButtonType } from "../../../components/common/Button/button.types";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/userSelectors";
import { Socket, socket } from "../../../Sockets/Message.socket";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchChats } from "../../../api/requests";
import { IChatRoom } from "../../../types";

const Post = () => {
  const queryClient = useQueryClient();
  const user = useSelector(selectUser);
  const userId = user._id;
  const { id } = useParams();
  const postId = id ?? "";
  const { data: post, isLoading, error } = usePost(postId);

  useEffect(() => {
    const refetchChatsAndGoToChat = (data: IChatRoom) => {
      queryClient.invalidateQueries([fetchChats.name]);
      console.log(data);
      ////////////////////////////////////////////////
      //fortsätt här gå till chat/:id router ?
    };

    if (userId) {
      Socket.init(userId);
      socket().on("create-chat", refetchChatsAndGoToChat);
    }
  }, [userId, queryClient]);

  if (isLoading && postId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!post) return null;

  const {
    images,
    title,
    description,
    condition,
    createdAt,
    _id: postUser,
  } = post;
  console.log(post);

  const handleGoToChat = () => {
    socket().emit("create-chat", { receiverId: postUser, userId });
  };

  return (
    <Box gap="20px" padding="20px">
      <ImageCarousel images={images} />
      <h1>{title}</h1>
      <p>{description}</p>
      <Button onClick={handleGoToChat} buttonType={ButtonType.Primary}>
        Message
      </Button>
    </Box>
  );
};

export default Post;
