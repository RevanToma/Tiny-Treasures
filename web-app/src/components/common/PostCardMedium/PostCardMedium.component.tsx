import { useNavigate } from "react-router-dom";
import * as S from "./postCardMedium.styles";

import Box from "../Box/Box";
import { theme } from "../../../styles/themes";
import { Post } from "../../../types";
import { getDate } from "../../../utils/helpers";

interface PostCardMediumProps {
  post: Post;
}

const PostCardMedium: React.FC<PostCardMediumProps> = ({ post }) => {
  const navigate = useNavigate();

  const gridTempCol = post.images.length === 1 ? "1fr" : "1fr 1fr";

  return (
    <S.BoxWithChildren
      cursor="pointer"
      onClick={() => navigate(`/post/${post._id}`)}
      backgroundColor="#fff"
      padding=".8rem"
      borderRadius={theme.radius.image}
      boxShadow={theme.shadow}
    >
      <Box display="grid" gridTemplateColumns={gridTempCol} gap=".3rem">
        {post.images.map((img, i) => {
          if (i < 4)
            return (
              <S.ImageBox key={img}>
                <img src={img} alt="Picture" />
              </S.ImageBox>
            );
        })}
      </Box>
      {/* <h2>{post.categories.join(',')}</h2> */}
      <h2>{post.condition}</h2>
      <h2>{getDate(post.createdAt)}</h2>
      <h2>{post.distance}</h2>
      <h2>{post.sizes}</h2>
      <h2>{post.age}</h2>
    </S.BoxWithChildren>
  );
};

export default PostCardMedium;
