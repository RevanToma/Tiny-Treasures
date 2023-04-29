import { useEffect, useState } from "react";
import { socket } from "./Sockets/Message.socket";
import ConnectionManager from "./components/Socket/ConnectionManager";
import SocketState from "./components/Socket/SocketState";
import MessageForm from "./components/chat/chatBox/ChatRoom";

function App() {
  const [myUserId, setMyUserId] = useState("");

  const [reciverId, setReciverId] = useState("");
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

  const submitHandler = (event: any) => {
    event.preventDefault();
    setMyUserId(event.target["user_id"].value);

    setReciverId(event.target["r_id"].value);
  };

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

      {myUserId && <MessageForm userToken={myUserId} recieverId={reciverId} />}
    </>
  );
}

export default App;
