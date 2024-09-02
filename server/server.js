const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 4000;
const http = require("http").Server(app);
const socket = require("socket.io");

const socketIO = socket(http, {
  cors: {
    origin: true,
    credentials: true,
  },
});
socketIO.on("connection", (socket) => {
  //sends the message to all the users on the server
  console.log(socket.id + " connected");
  socket.on("message", (data) => {
    socketIO.to(data.roomId).emit("messageResponse", data);
  });
  socket.on("playPause", (data) => {
    socket.broadcast.to(data.roomId).emit("playPauseResponse", data);
  });
  socket.on("seek", (data) => {
    socket.broadcast.to(data.roomId).emit("seekResponse", data);
  });
  socket.on("join", (data) => {
    socket.join(data.roomId);
    console.log(data.roomId);
  });

  socket.on("disconnect", () => {});
});

http.listen(port, () => {});

app.get("/", (req, res) => {
  res.send("Hello world");
});
