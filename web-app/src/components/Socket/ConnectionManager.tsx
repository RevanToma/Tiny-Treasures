import React from "react";
import { socket } from "../../Sockets/Message.socket";

const ConnectionManager: React.FC = () => {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
};

export default ConnectionManager;
