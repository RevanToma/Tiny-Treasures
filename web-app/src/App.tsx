import { useEffect, useState } from "react";
import { socket } from "./Sockets/Message.socket";
import ConnectionManager from "./components/Socket/ConnectionManager";
import SocketState from "./components/Socket/SocketState";
import MessageForm from "./components/Socket/MessageForm";
function App() {
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

  return (
    <>
      <ConnectionManager />
      <SocketState isConnected={isConnected} />
      <MessageForm
        socketId="9xUch3wUf3UGJtYhAAAH"
        userToken="614a74ec4f43f38d1c9054d8"
        recieverId="614a74ec4f43f38d1c9054d8"
      />
      <MessageForm
        socketId="rnj-uxL7FnIHCY82AAAF"
        userToken="614a74ec4f43f38d1c9054d8"
        recieverId="614a74ec4f43f38d1c9054d8"
      />
    </>
  );
}

export default App;
