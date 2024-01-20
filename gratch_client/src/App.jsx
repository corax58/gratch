import { useEffect, useState } from "react";

import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./Pages/Main";
import LoginPage from "./Pages/LoginPage";
import Room from "./Pages/Room";

import socket from "socket.io-client";
const io = socket.connect("http://localhost:4000");

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/main/:roomId" element={<Main io={io} />}></Route>
          <Route path="/rooms" element={<Room />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
