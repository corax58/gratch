import React, { useEffect, useRef, useState } from "react";

import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPanel = ({ io, roomId }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef();

  useEffect(() => {
    io.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [io, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-1/3 border-2 border-t-0 border-black border-b-0 ">
      <div className="bg-bluee h-20 text-white border-b-2 border-black shadow-2xl ">
        <span className="flex justify-center p-5 text-3xl">Chat</span>
      </div>
      <ChatBody messages={messages} lastMessageRef={lastMessageRef}></ChatBody>
      <ChatFooter io={io} roomId={roomId} />
    </div>
  );
};

export default ChatPanel;
