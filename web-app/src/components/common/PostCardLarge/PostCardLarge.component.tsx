import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import * as S from './postCardLarge.styles';
import { useSelector } from 'react-redux';
import { Post } from '../../../types';
import {
  selectIsSignedIn,
  selectUser,
<<<<<<< HEAD
} from '../../../store/user/userSelectors';
import Box from '../Box/Box';
import { getDate, getListFromArray } from '../../../utils/helpers';
import { theme } from '../../../styles/themes';
import { useAppDispatch } from '../../../hooks/useDispatch';
import { updateUserAsync } from '../../../store/user/userSlice';
import LightBox from '../LightBox/LightBox.component';
=======
} from "../../../store/user/userSelectors";
import Box from "../Box/Box";
import { getDate } from "../../../utils/helpers";
import { theme } from "../../../styles/themes";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { updateUserAsync } from "../../../store/user/userSlice";
import LightBox from "../LightBox/LightBox.component";
import HeartIcon from "../../../routes/settings/MyFavourites/HeartComponent/Heart.component";
>>>>>>> a66734963b90dfc5c703080876a70fc8e84c3357

interface PostCardLargeProps {
  post: Post;
}

const PostCardLarge: React.FC<PostCardLargeProps> = ({ post }) => {
  // const dispatch = useAppDispatch();
  const { title, description, condition, id } = post;
  const user = useSelector(selectUser);
  // const isSignedIn = useSelector(selectIsSignedIn);

<<<<<<< HEAD
  const toggleSavedPost = (): void => {
    const updatedSavedPosts = updateSavedPosts();
    if (!updatedSavedPosts) return;
    dispatch(updateUserAsync({ newData: updatedSavedPosts, field: 'saved' }));
  };

  const updateSavedPosts = (): string[] | null => {
    if (!isSignedIn) return null;
    // eslint-disable-next-line no-unsafe-optional-chaining
    if (!user) return null;
    const newSavedPosts = [...user.favorites];
=======
  // const toggleSavedPost = (): void => {
  //   const updatedSavedPosts = updateSavedPosts();
  //   if (!updatedSavedPosts) return;
  //   dispatch(updateUserAsync({ newData: updatedSavedPosts, field: "saved" }));
  // };

  // const updateSavedPosts = (): string[] | null => {
  //   if (!isSignedIn) return null;
  //   // eslint-disable-next-line no-unsafe-optional-chaining
  //   if (!user) return null;
  //   const newSavedPosts = [...user.favourites];
>>>>>>> a66734963b90dfc5c703080876a70fc8e84c3357

  //   const index = newSavedPosts.indexOf(id);
  //   if (index === -1) {
  //     newSavedPosts.push(id);
  //   } else {
  //     newSavedPosts.splice(index, 1);
  //   }
  //   return newSavedPosts;
  // };

  console.log(post);

  return (
    <S.Wrapper width="100%" alignItems="center">
      {post.images.length > 0 && <LightBox images={post.images} />}

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
        justifyContent="space-between"
        alignItems="flex-start"
        gap="2rem"
        marginBottom="1rem"
        width="100%"
      >
        <h1>{title}</h1>
        {user?.favorites && user.favorites.includes(id) ? (
          <Box width="4rem">
            <HeartIcon postId={post._id} />
          </Box>
        ) : (
          <Box width="4rem">
            <HeartIcon postId={post._id} />
          </Box>
        )}
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
