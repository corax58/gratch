import React, { useState } from "react";
import background from "../assets/loginBackground.jpg";
import randomString from "../../randomString";
import { useNavigate } from "react-router-dom";

const Room = () => {
  const [roomInput, setRoomInput] = useState(false);
  const navigator = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    navigator("/main/" + e.target[0].value);
  };

  const handleCreateRoom = () => {
    const roomid = randomString();
    navigator("/main/" + roomid);
  };

  return (
    <div className="h-screen w-screen relative">
      <div className=" absolute  text-center w-full">
        <div className=" h-96 w-max m-auto  mt-80  pt-24 flex flex-row ">
          {roomInput ? (
            <form action="" className="flex flex-col" onSubmit={handleSubmit}>
              <span className="text-white font-bold ">Room Id:</span>
              <input
                type="number"
                className="h-10 rounded-md bg-pink-300 p-2 font-semibold text-white m-5 mt-2"
                required
              />
              <button
                type="submit"
                className="bg-pink-600 h-max px-10 py-2 w-max m-auto mt-0 rounded-xl text-xl  text-white   shadow-pink-700 shadow-2xl "
              >
                JOIN
              </button>
            </form>
          ) : (
            <div
              className=" w-40  m-10 h-40 flex justify-center  items-center bg-indigo-500 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
              onClick={handleCreateRoom}
            >
              <span className=" text-4xl font-black font-serif text-white">
                Create Room
              </span>
            </div>
          )}

          <div className=" w-40  m-10 h-40 flex justify-center  items-center bg-indigo-500 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer">
            <span
              className=" text-4xl font-black font-serif text-white"
              onClick={() => setRoomInput(!roomInput)}
            >
              Join Room
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <img src={background} alt="" className="h-full w-full static" />
    </div>
  );
};

export default Room;
