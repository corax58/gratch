import React, { useState } from "react";
import background from "../assets/loginBackground.jpg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");

  const navigator = useNavigate();
  const handleSubmit = (e) => {
    localStorage.setItem("username", username);
    e.preventDefault();
    navigator("/rooms");
  };
  return (
    <div className="h-screen w-screen relative">
      <div className=" absolute h-full text-center w-full ">
        <div className=" h-full w-full flex items-center">
          <div className=" h-96 w-96 m-auto    pt-24 ">
            <form action="" className="flex flex-col " onSubmit={handleSubmit}>
              <input
                type="text"
                className=" h-14 rounded-xl opacity-50 bg-pink-200 p-4 text-xl  font-semibold  shadow-2xl  mt-4 "
                placeholder="Enter a Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                className={
                  " bg-pink-600 h-12  w-44 m-auto rounded-xl text-2xl  text-white font-semibold    shadow-pink-700 shadow-2xl mt-12"
                }
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
      <img src={background} alt="" className=" h-screen w-screen static" />
    </div>
  );
};

export default LoginPage;
