import React from "react";
import Box from "../../common/Box/Box";
import { Post } from "../../../types";
import * as S from "./styled";
import { ButtonType } from "../../common/Button/button.types";
import Button from "../../common/Button/Button.component";
import { theme } from "../../../styles/themes";

type ChatPostItemProps = {
  post: Post;
  navigateToPost: () => void;
};

const ChatPostItem: React.FC<ChatPostItemProps> = ({
  post,
  navigateToPost,
}) => {
  const handleTrade = () => {
    console.log("trade");
  };
  return (
    <Box
      width="100%"
      borderRadius="0 0 10px 10px"
      boxShadow={theme.shadow}
      padding="20px"
    >
      <h1>MESSAGES</h1>
      <Box gap="10px" flexDirection="row" alignItems="center">
        <Box
          cursor="pointer"
          gap="10px"
          onClick={navigateToPost}
          alignItems="flex-start"
        >
          <S.Image src={post.images[0]} alt="" />
          <h4>{post.title}</h4>
          <p>{`Conversation with other`}</p>
        </Box>
        <Button onClick={handleTrade} buttonType={ButtonType.Trade}>
          TRADE
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPostItem;
