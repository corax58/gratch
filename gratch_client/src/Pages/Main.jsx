import React, { useEffect, useState } from "react";
import PlayerPanel from "../Components/PlayerPanel";
import ChatPanel from "../Components/ChatPanel";
import { useParams } from "react-router-dom";

const Main = ({ io }) => {
  const { roomId } = useParams();

  useEffect(() => {
    io.emit("join", { roomId: roomId, name: localStorage.getItem("username") });
  });
  return (
    <div className="flex flex-row bg-white">
      <PlayerPanel io={io} roomId={roomId} />
      <ChatPanel io={io} roomId={roomId} />
    </div>
  );
};

export default Main;
