import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import * as S from "./postCardLarge.styles";
import { useSelector } from "react-redux";
import { Post } from "../../../types";
import {
  selectIsSignedIn,
  selectUser,
} from "../../../store/user/userSelectors";
import Box from "../Box/Box";
import { getDate } from "../../../utils/helpers";
import { theme } from "../../../styles/themes";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { updateUserAsync } from "../../../store/user/userSlice";
import LightBox from "../LightBox/LightBox.component";
import HeartIcon from "../../../routes/settings/MyFavourites/HeartComponent/Heart.component";

interface PostCardLargeProps {
  post: Post;
}

const PostCardLarge: React.FC<PostCardLargeProps> = ({ post }) => {
  // const dispatch = useAppDispatch();
  const { title, description, condition, id } = post;
  const user = useSelector(selectUser);
  // const isSignedIn = useSelector(selectIsSignedIn);

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

  //   const index = newSavedPosts.indexOf(id);
  //   if (index === -1) {
  //     newSavedPosts.push(id);
  //   } else {
  //     newSavedPosts.splice(index, 1);
  //   }
  //   return newSavedPosts;
  // };

  return (
    <S.Wrapper padding="0 1rem" alignItems="center">
      <LightBox images={post.images} />
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        marginTop="1.6rem"
        marginBottom="5rem"
        columnGap="4rem"
        rowGap=".2rem"
        width="100%"
      >
        <p>Date: {getDate(post.createdAt)}</p>
        <p>Location: {post.location.city}</p>
        <p>Condition: {condition}</p>
        <p>Distance: {post.distance}km</p>
        <p>Sizes: {post.sizes}</p>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
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
        backgroundColor="#fff"
        borderRadius={theme.radius.image}
        boxShadow={theme.shadow}
        padding="1.2rem"
        marginBottom="1rem"
      >
        <p>{description}</p>
      </Box>
    </S.Wrapper>
  );
};

export default PostCardLarge;
