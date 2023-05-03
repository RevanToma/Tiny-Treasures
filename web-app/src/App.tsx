import { useEffect, useState } from "react";
import ChatRoomList from "./components/chat/ChatRoomList/ChatRoomList";
import { socket, Socket } from "./Sockets/Message.socket";
import { useQueryClient } from "@tanstack/react-query";
import { fetchChats } from "./api/requests";

function App() {
  const [userId, setUserId] = useState("");
  const queryClient = useQueryClient();

  const handleLogIn = (event: any) => {
    event.preventDefault();
    setUserId(event.target["user_id"].value);
    Socket.init(event.target["user_id"].value);
  };

  const handleOpenChat = (event: any) => {
    event.preventDefault();
    socket().emit("create-chat", {
      userId,
      receiverId: event.target["receiver_id"].value,
    });
  };

  useEffect(() => {
    const refetchChats = () => {
      queryClient.invalidateQueries({
        queryKey: [fetchChats.name],
      });
    };
    if (userId) socket().on("create-chat", refetchChats);
  }, [queryClient, userId]); // 644798e9c829c53744a8ae49
  // 6447e5dd3f1fca8a6a257d86
  // 6447e8696312cbecc42ebaab
  // 64493c98d9bc5bcf3b01a8d9

  return (
    <>
      <form onSubmit={(e) => handleLogIn(e)}>
        <input type="text" name="" id="user_id" placeholder="My user id" />
        <button
          type="submit"
          style={{
            backgroundColor: userId ? "green" : "red",
            color: "white",
            width: "100px",
            height: "20px",
            border: "none",
            borderRadius: "4px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          LOGIN
        </button>
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
      {userId && <ChatRoomList userId={userId} />}
    </>
  );
}

export default App;
