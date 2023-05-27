import { useNavigate } from 'react-router-dom';
import * as S from './postCardMedium.styles';

import Box from '../Box/Box';
import { Post } from '../../../types';
import { getDate } from '../../../utils/helpers';
import HeartIcon from '../../../routes/settings/MyFavourites/HeartComponent/Heart.component';

interface PostCardMediumProps {
  post: Post;
}

const PostCardMedium: React.FC<PostCardMediumProps> = ({ post }) => {
  const navigate = useNavigate();

  // const [location, setLocation] = useState("");
  // const { city } = JSON.parse(localStorage.getItem('location') || 'null');

  return (
    <>
      <S.Wrapper
        position="relative"
        cursor="pointer"
        gap="0.5rem"
        alignItems="flex-start"
        height="30rem"
      >
        <S.ImageBox onClick={() => navigate(`/post/${post._id}`)}>
          <img src={post.images[0]} alt="Picture" />
        </S.ImageBox>
        <Box
          alignItems="flex-start"
          padding="0 .6rem"
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <h2>{post.title}</h2>
          <p>Published: {getDate(post.createdAt)}</p>
          {/* <p>Type: {getListFromArray(post.typeOfItems)}</p> */}
          {/* {post.sizes.length > 0 && <p>Sizes: {getListFromArray(post.sizes)}</p>} */}
          <p>Location: {post.location.city}</p>
          {/* <p>Number of items: {post.itemCount}</p> */}
        </Box>
        <HeartIcon postId={post._id} />
      </S.Wrapper>
    </>
  );
};

export default PostCardMedium;
