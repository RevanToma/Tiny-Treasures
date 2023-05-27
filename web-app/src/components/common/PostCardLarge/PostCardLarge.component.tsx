import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import * as S from './postCardLarge.styles';
import { useSelector } from 'react-redux';
import { IReviewPost, IPost } from '../../../types';
import {
  selectIsSignedIn,
  selectUser,
} from '../../../store/user/userSelectors';
import Box from '../Box/Box';
import { getDate, getListFromArray } from '../../../utils/helpers';
import { theme } from '../../../styles/themes';
import { useAppDispatch } from '../../../hooks/useDispatch';
import { updateUserAsync } from '../../../store/user/userSlice';
import LightBox from '../LightBox/LightBox.component';
import HeartIcon from '../../../routes/settings/MyFavourites/HeartComponent/Heart.component';

interface PostCardLargeProps {
  post: IPost | IReviewPost;
  isReview?: boolean;
  setPrimaryImage?: (index: number) => void;
}

const PostCardLarge: React.FC<PostCardLargeProps> = ({
  post,
  isReview = false,
  setPrimaryImage,
}) => {
  const { title, description, condition, _id } = post;
  const user = useSelector(selectUser);

  return (
    <S.Wrapper width="100%" alignItems="center">
      {post.images.length > 0 && (
        <LightBox
          setPrimaryImage={setPrimaryImage && setPrimaryImage}
          isReview={isReview}
          images={post.images}
        />
      )}

      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        marginTop="3.6rem"
        marginBottom="5rem"
        columnGap="3rem"
        rowGap=".2rem"
        width="100%"
      >
        <S.Details>Published: {getDate(post.createdAt)}</S.Details>
        <S.Details>Ages: {post.age}</S.Details>
        <S.Details>Category: {post.group}</S.Details>
        <S.Details>Location: {post.location.city}</S.Details>
        <S.Details>
          Type of Items: {getListFromArray(post.typeOfItems)}
        </S.Details>
        <S.Details>Distance: {post.distance}km</S.Details>
        <S.Details>Condition: {condition}</S.Details>
        <S.Details>Number of Items: {post.itemCount}</S.Details>
        {post.group === 'clothes' && (
          <S.Details>Sizes: {getListFromArray(post.sizes)}</S.Details>
        )}
      </Box>
      <Box
        flexDirection="row"
        alignItems="flex-start"
        gap="2rem"
        marginBottom="1rem"
        width="100%"
      >
        <h1>{title}</h1>

        <Box width="20rem" alignItems="center">
          <HeartIcon disabled={isReview} postId={_id} />
        </Box>
      </Box>
      <Box
        width="100%"
        borderRadius={theme.radius.image}
        marginBottom="3.6rem"
        alignItems="flex-start"
      >
        <S.Description>{description}</S.Description>
      </Box>
    </S.Wrapper>
  );
};

export default PostCardLarge;
