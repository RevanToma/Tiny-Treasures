import { useNavigate } from "react-router-dom";
import * as S from "./postCardMedium.styles";

import Box from "../Box/Box";
import { theme } from "../../../styles/themes";
import { Post } from "../../../types";
import { getDate } from "../../../utils/helpers";
import { useState } from "react";

interface PostCardMediumProps {
  post: Post;
}

const PostCardMedium: React.FC<PostCardMediumProps> = ({ post }) => {
  const navigate = useNavigate();
  // const [location, setLocation] = useState("");
  // const { city } = JSON.parse(localStorage.getItem("location") || "null");

  const gridTempCol = post.images.length === 1 ? "1fr" : "1fr 1fr";

  return (
    <S.BoxWithChildren
      cursor="pointer"
      onClick={() => navigate(`/post/${post._id}`)}
      backgroundColor="#fff"
      padding=".8rem"
      borderRadius={theme.radius.image}
      boxShadow={theme.shadow}
      gap="0.5rem"
      alignItems="flex-start"
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
      <p>{post.title}</p>
      <p>Published: {getDate(post.createdAt)}</p>
      {/* <p>Location: {city}</p> */}
      {/* <h2>{post.condition}</h2> */}
      {/* <h2>{post.sizes}</h2>
      <h2>{post.age}</h2> */}
    </S.BoxWithChildren>
  );
};

export default PostCardMedium;
