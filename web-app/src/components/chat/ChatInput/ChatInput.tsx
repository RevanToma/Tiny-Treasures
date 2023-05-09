import { FaPaperPlane } from "react-icons/fa";
import Box from "../../common/Box/Box";
import * as S from "./styled";

type ChatInputProps = {
  onSubmit: (event: MouseEvent) => void;
  handleChatInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  chatInputRef: React.RefObject<HTMLInputElement>;
};

const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  handleChatInput,
  chatInputRef,
}) => {
  return (
    <Box flexDirection="row" gap="10px" justifyContent="space-between">
      <S.MessageInputForm>
        <S.MessageInput
          ref={chatInputRef}
          placeholder="Write something..."
          onChange={handleChatInput}
        />
      </S.MessageInputForm>
      <Box cursor="pointer" justifyContent="center" alignItems="center">
        <FaPaperPlane size={32} onClick={onSubmit} />
      </Box>
    </Box>
  );
};

export default ChatInput;
