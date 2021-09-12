import React from "react";
import { useLocation } from "react-router-dom";
import socket from "socket.io-client";

function GameRoomPage() {
  const location = useLocation();
  const io = socket("localhost:8080/holdem-room");
  io.on("connection", () => console.log("connection success"));
  io.emit("joinRoom", { room: "testroom" });
  return <h1>here is a game room {location.state.roomName}</h1>;
}

export default GameRoomPage;
