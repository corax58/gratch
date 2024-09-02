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
    <div className=" hidden md:flex flex-col w-1/4 border border-t-0 border-black border-b-0  h-screen">
      <div className="bg-slate-900 h-20 text-white border border-black shadow-2xl ">
        <span className="flex justify-center p-5 text-3xl">Chat</span>
      </div>
      <ChatBody messages={messages} lastMessageRef={lastMessageRef}></ChatBody>
      <ChatFooter io={io} roomId={roomId} />
    </div>
  );
};

export default ChatPanel;
