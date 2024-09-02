import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const ChatFooter = ({ io, roomId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("username")) {
      io.emit("message", {
        text: message,
        name: localStorage.getItem("username"),
        id: `${io.id}${Math.random()}`,
        socketID: io.id,
        roomId: roomId,
      });
    }
    setMessage("");
  };
  return (
    <div className=" shadow-xl border-t-2 border-black w-full bg-slate-900 border-b-1 pb-2 ">
      <div>
        <form
          action=""
          className=" m-9 mr-3 mb-2 flex flex-row"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            className="w-full mr-3 rounded-xl shadow-2xl bg-slate-400 placeholder-gray-500 p-2"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className=" bg-slate-500 rounded-full p-2 shadow-2xl hover:bg-slate-400 text"
          >
            <RiSendPlaneFill size={25} className="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatFooter;
