import React from "react";

type SocketStateProps = {
  isConnected: boolean;
};

const SocketState: React.FC<SocketStateProps> = ({ isConnected }) => {
  return <div>{isConnected ? "connected" : "disconnected"}</div>;
};

export default SocketState;
