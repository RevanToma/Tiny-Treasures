import React from "react";
import Box from "../../common/Box/Box";
import { Post } from "../../../types";
import * as S from "./styled";

type ChatPostItemProps = {
  post: Post;
  navigateToPost: () => void;
};

const ChatPostItem: React.FC<ChatPostItemProps> = ({
  post,
  navigateToPost,
}) => {
  return (
    <Box alignItems="center" onClick={navigateToPost}>
      <h1>MESSAGES</h1>
      <S.Image src={post.images[0]} alt="" />
      {post.title}
    </Box>
  );
};

export default ChatPostItem;
