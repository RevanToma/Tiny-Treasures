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
    <Box width="100%" boxShadow={theme.shadow} padding="30px" gap="20px">
      <h4>userName</h4>
      <Box
        width="100%"
        gap="20px"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="flex-start"
      >
        <S.Image
          onClick={navigateToPost}
          src={post.images[0]}
          alt="post image"
        />
        <Button onClick={handleTrade} buttonType={ButtonType.SmallGreen}>
          TRADE
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPostItem;
