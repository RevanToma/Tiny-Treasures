import { useParams } from 'react-router-dom';
import Button from '../../components/common/Button/Button.component';
import { selectUser } from '../../store/user/userSelectors';
import { usePost } from '../../hooks/usePost';
import { socket } from '../../Sockets/Message.socket';
import Box from '../../components/common/Box/Box';
import GoBackNav from '../../components/common/GoBackNav/GoBackNav.component';
import PostCardLarge from '../../components/common/PostCardLarge/PostCardLarge.component';
import { useSelector } from 'react-redux';
import { ButtonType } from '../../components/common/Button/button.types';

const Post: React.FC = () => {
  const postId = useParams().id;
  const user = useSelector(selectUser);

  const { data: post, isError, error, isLoading } = usePost(postId);

  const goToChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    // const chatData = getChatData(e);
    // socket.emit('get room', chatData);
  };

  // // HELPERS
  // const getChatData = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ): ChatDataEmitJoin | null => {
  //   const recieverId = e.currentTarget.dataset.user;
  //   if (!user || !recieverId || !postId) return null;
  //   return {
  //     users: [user.id, recieverId],
  //     post: postId,
  //   };
  // };

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
            <Button
              onClick={goToChat}
              data-user={post.user}
              buttonType={ButtonType.Primary}
            >
              Message Seller
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Post;
