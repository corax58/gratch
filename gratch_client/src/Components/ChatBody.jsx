import React from "react";

const ChatBody = ({ messages, lastMessageRef }) => {
  return (
    <div className=" w-full bg-slate-700   h-full  shadow-lg overflow-y-scroll   ">
      <div></div>
      <div className=" w-full">
        <Messageboard messages={messages} />
      </div>
      <div ref={lastMessageRef} />
    </div>
  );
};

const SentMessage = ({ name, text }) => {
  return (
    <div className=" mr-0 relative w-full ">
      <div className="flex flex-row right-0 w-full bg-red-400 ">
        <div className=" h-5  w-full"></div>{" "}
        <div className="w-3/4 bg-gradient-to-r from-cyan-500 to-blue-500 px-2 rounded-2xl  text-wrap m-2 p-2   right-2 mt-5  font-semibold">
          <p className=" break-words  ">{text}</p>
        </div>
        <div className="m-2">
          <p className="text-white  font-medium    right-1">{name}</p>
        </div>
      </div>
    </div>
  );
};
const ReceivedMessage = ({ name, text }) => {
  return (
    <div className=" mr-0  right-0 flex">
      <div className="m-2">
        <p className="text-white  font-medium    right-1">{name}</p>
      </div>
      <div className=" bg-gradient-to-r  from-rose-400 to-purple-400 p-2 rounded-2xl  text-wrap m-2 w-max  right-2 mt-5 font-semibold">
        <p>{text}</p>
      </div>
      <div className="h-5 w-full"></div>
    </div>
  );
};

const Messageboard = ({ messages }) => {
  return (
    <div className=" bg-pink-700 w-full">
      {messages.map((msg) => {
        if (msg.name === localStorage.getItem("username")) {
          return <SentMessage name={msg.name} text={msg.text} key={msg.id} />;
        } else {
          return (
            <ReceivedMessage name={msg.name} text={msg.text} key={msg.id} />
          );
        }
      })}
    </div>
  );
};

export default ChatBody;
