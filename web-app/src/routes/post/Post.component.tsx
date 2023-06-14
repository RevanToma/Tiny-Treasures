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
import { deletePost, fetchChats } from '../../api/requests';
import Spinner from '../../components/common/spinner/spinner.component';
import { getFormValuesFromPost } from './post.helpers';
import { useDispatch } from 'react-redux';
import { setGiveFormValues } from '../../store/giveFormValues/giveFormValuesSlice';

const Post: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const postId = useParams().id;
  const user = useSelector(selectUser);

  const { data: post, isError, error, isLoading } = usePost(postId);

  useEffect(() => {
    if (!user) return;
    const refetchChatsAndGoToChat = (data: IChatRoom) => {
      queryClient.invalidateQueries([fetchChats.name]);
      if (post?._id) {
        navigate(`/chat/${data._id}/${post?._id}`);
      }
    };

    if (user._id) {
      socket().on('create-chat', refetchChatsAndGoToChat);
    }

    return () => socket().off('create-chat', refetchChatsAndGoToChat);
  }, [user?._id, queryClient, navigate, post?._id]);

  if (isLoading && postId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!post) return null;
  const { user: postUser } = post;

  const goToChat = (): void => {
    socket().emit('create-chat', { receiverId: postUser, post });
  };

  const handleEditPost = () => {
    const giveFormValues = getFormValuesFromPost(post);
    dispatch(setGiveFormValues(giveFormValues));
    navigate(`/giveaway/${postId}`);
  };

  const handleRemovePost = () => {
    alert('Are you sure that you want to remove this post?');

    deletePost(postId);
    window.history.back();
  };

  return (
    <Box padding="2.4rem" gap="3rem" backgroundColor="##F3F0E6">
      <GoBackNav title="Item" />
      {isLoading || !post ? (
        <p>loading spinner</p>
      ) : isError ? (
        <p>error message: ${error instanceof Error && error.message}</p>
      ) : (
        <Box padding="2.4rem 0">
          <PostCardLarge post={post} />
          <Box alignItems="center">
            {post.user === user?._id ? (
              <Box gap="2rem">
                <Button
                  onClick={handleEditPost}
                  buttonType={ButtonType.Secondary}
                >
                  Edit
                </Button>
                <Button
                  onClick={handleRemovePost}
                  buttonType={ButtonType.Primary}
                >
                  Remove
                </Button>
              </Box>
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
