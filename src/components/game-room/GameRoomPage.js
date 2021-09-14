import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { config } from "../../config";

function GameRoomPage() {
  const socket = useRef(null);
  const location = useLocation();
  const roomId = location.state.roomId;
  const roomName = location.state.roomName;

  useEffect(() => {
    socket.current = io(config.baseURL + "/holdem-room");
    socket.current.emit("joinRoom", {
      roomId: roomId,
      roomName: roomName,
    });
    socket.current.on("joinedRoom", (e) => console.log(e));
  }, []);

  return <h1>here is a game room {roomName}</h1>;
}

export default GameRoomPage;
