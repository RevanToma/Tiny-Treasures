import { useEffect, useState } from "react";
import ChatRoomList from "./components/chat/ChatRoomList/ChatRoomList";
import { socket } from "./Sockets/Message.socket";

function App() {
  const [userId, setUserId] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const handleLogIn = (event: any) => {
    event.preventDefault();
    setUserId(event.target["user_id"].value);
  };

  const handleOpenChat = (event: any) => {
    event.preventDefault();
    setReceiverId(event.target["receiver_id"].value);
  };

  // 644798e9c829c53744a8ae49
  // 6447e5dd3f1fca8a6a257d86
  // 6447e8696312cbecc42ebaab
  // 64493c98d9bc5bcf3b01a8d9

  return (
    <>
      <form onSubmit={(e) => handleLogIn(e)}>
        <input type="text" name="" id="user_id" placeholder="My user id" />
        <button type="submit">LOGIN</button>
      </form>

      <form onSubmit={(e) => handleOpenChat(e)}>
        <input
          type="text"
          name=""
          id="receiver_id"
          placeholder="chat with id"
        />
        <button type="submit">Open chat with other user</button>
      </form>
      <div>userId: {userId}</div>
      <div>receiverId: {receiverId}</div>
      <ChatRoomList userId={userId} />
    </>
  );
}

export default App;
