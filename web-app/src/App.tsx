import { useEffect, useState } from "react";
import { socket } from "./Sockets/Message.socket";
import ConnectionManager from "./components/Socket/ConnectionManager";
import SocketState from "./components/Socket/SocketState";
import ChatRoomList from "./components/chat/ChatRoomList/ChatRoomList";
import { IChatRoom } from "./types";

function App() {
  const [userId, setUserId] = useState("");
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);
  const [recieverId, setReciverId] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (userId.length < 1) return;
    socket.emit("join-rooms", userId);
  }, [userId]);

  useEffect(() => {
    socket.on("join-rooms", (rooms) => {
      console.log(rooms);
      setChatRooms(rooms);
    });
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    setUserId(event.target["user_id"].value);

    setReciverId(event.target["r_id"].value);
  };

  const handleCreateNewChat = () => {
    socket.emit("create-chat", { userId, recieverId });
  };

  useEffect(() => {
    socket.on("create-chat", (newRoom) => {
      setChatRooms((prev) => [...prev, newRoom]);
    });
  }, []);

  // 644798e9c829c53744a8ae49
  // 6447e5dd3f1fca8a6a257d86
  // 6447e8696312cbecc42ebaab
  // 64493c98d9bc5bcf3b01a8d9
  return (
    <>
      <ConnectionManager />
      <SocketState isConnected={isConnected} />
      <form onSubmit={(e) => submitHandler(e)}>
        <input type="text" name="" id="user_id" placeholder="My user id" />
        <input type="text" name="" id="r_id" placeholder="Receiver id" />
        <button type="submit">Login and set Reciever id</button>
      </form>
      <button onClick={handleCreateNewChat}>OPEN CHAT WITH RECIEVER</button>
      {chatRooms && <ChatRoomList userId={userId} chatRooms={chatRooms} />}
      {/* {userId && <ChatRoom chatMembers={{ userId, recieverId }} />} */}
    </>
  );
}

export default App;
