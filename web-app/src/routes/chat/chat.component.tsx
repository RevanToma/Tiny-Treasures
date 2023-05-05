import ChatRoomList from "../../components/chat/ChatRoomList/ChatRoomList";

import { selectUser } from "../../store/user/userSelectors";
import { useSelector } from "react-redux";

function Chat() {
  const user = useSelector(selectUser);

  // 644798e9c829c53744a8ae49
  // 6447e5dd3f1fca8a6a257d86
  // 6447e8696312cbecc42ebaab
  // 64493c98d9bc5bcf3b01a8d9

  return <>{user._id && <ChatRoomList userId={user._id} />}</>;
}

export default Chat;
