import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../components/common/Button/Button.component';
import { selectUser } from '../../store/user/userSelectors';
import { usePost } from '../../hooks/usePost';
import { socket } from '../../Sockets/Message.socket';
import Box from '../../components/common/Box/Box';
import GoBackNav from '../../components/common/GoBackNav/GoBackNav.component';
import PostCardLarge from '../../components/common/PostCardLarge/PostCardLarge.component';
import { useSelector } from 'react-redux';
import { ButtonType } from '../../components/common/Button/button.types';
import { useQueryClient } from '@tanstack/react-query';
import { IChatRoom } from '../../types';
import { fetchChats } from '../../api/requests';
import Spinner from '../../components/common/spinner/spinner.component';

const Post: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postId = useParams().id;
  const user = useSelector(selectUser);

  const { data: post, isError, error, isLoading } = usePost(postId);

  useEffect(() => {
    if (!user) return;
    const refetchChatsAndGoToChat = (data: IChatRoom) => {
      queryClient.invalidateQueries([fetchChats.name]);
      if (post?.id) {
        navigate(`/chat/${data._id}/${post?.id}`);
      }
    };

    if (user._id) {
      socket().on('create-chat', refetchChatsAndGoToChat);
    }
  }, [user?._id, queryClient, navigate, post?.id]);

  if (isLoading && postId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!post) return null;
  const { user: postUser } = post;

  const goToChat = (): void => {
    socket().emit('create-chat', { receiverId: postUser, post });
  };

  const handleEditPost = () => {
    console.log('edit');
  };

  return (
    <Box padding="2.4rem" gap="3rem" backgroundColor="##F3F0E6">
      <GoBackNav title="Item" />
      {isLoading || !post ? (
        <p>loading spinner</p>
      ) : isError ? (
        <p>error message: ${error instanceof Error && error.message}</p>
      ) : (
        <Box padding="2.4rem">
          <PostCardLarge post={post} />
          <Box alignItems="center">
            {post.user === user?._id ? (
              <Button onClick={handleEditPost} buttonType={ButtonType.Primary}>
                Edit
              </Button>
            ) : (
              <Button
                onClick={goToChat}
                buttonType={user ? ButtonType.Primary : ButtonType.Disabled}
                disabled={user === null}
              >
                Message
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Post;
