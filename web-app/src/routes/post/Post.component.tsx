import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/common/Button/Button.component";
import { selectUser } from "../../store/user/userSelectors";
import { usePost } from "../../hooks/usePost";
import { Socket, socket } from "../../Sockets/Message.socket";
import Box from "../../components/common/Box/Box";
import GoBackNav from "../../components/common/GoBackNav/GoBackNav.component";
import PostCardLarge from "../../components/common/PostCardLarge/PostCardLarge.component";
import { useSelector } from "react-redux";
import { ButtonType } from "../../components/common/Button/button.types";
import { useQueryClient } from "@tanstack/react-query";
import { IChatRoom } from "../../types";
import { fetchChats } from "../../api/requests";
import Spinner from "../../components/common/spinner/spinner.component";

const Post: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postId = useParams().id;
  const user = useSelector(selectUser);

  const userId = user?._id;
  // const userId = user?._id;
  const { data: post, isError, error, isLoading } = usePost(postId);

  // console.log("POST FROM POST", post?.user);
  // console.log("USER FROM POST", user);
  // console.log("POST OBJCET FROM POST", post);
  // console.log("POST OBJCET FROM POST", user);

  useEffect(() => {
    const refetchChatsAndGoToChat = (data: IChatRoom) => {
      queryClient.invalidateQueries([fetchChats.name]);
      if (post?._id) {
        navigate(`/chat/${data._id}/${post?._id}`);
      }
    };

    if (userId) {
      socket().on("create-chat", refetchChatsAndGoToChat);
    }
  }, [userId, queryClient, navigate, post?._id]);

  if (isLoading && postId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!post) return null;
  const { user: postUser } = post;

  const goToChat = (): void => {
    socket().emit("create-chat", { receiverId: postUser, post });
  };

  const handleEditPost = () => {
    console.log("edit");
  };

  return (
    <Box padding="2.4rem" gap="3rem" backgroundColor="##F3F0E6">
      <GoBackNav title="item" />
      {isLoading || !post ? (
        <p>loading spinner</p>
      ) : isError ? (
        <p>error message: ${error instanceof Error && error.message}</p>
      ) : (
        <>
          <PostCardLarge post={post} />
          <Box alignItems="center">
            {post.user === userId ? (
              <Button onClick={handleEditPost} buttonType={ButtonType.Primary}>
                Edit
              </Button>
            ) : (
              <Button onClick={goToChat} buttonType={ButtonType.Primary}>
                Message
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Post;
