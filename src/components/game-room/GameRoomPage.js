import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { config } from "../../config";

function GameRoomPage() {
  const socket = useRef(null);
  const location = useLocation();
  const roomId = location.state.roomId;
  const roomName = location.state.roomName;
  const user = location.state.user;

  useEffect(() => {
    socket.current = io(config.baseURL + "/holdem-room");
    socket.current.emit("joinRoom", {
      roomId: roomId,
      roomName: roomName,
      userId: user.userId,
      nickname: user.nickname,
    });
    socket.current.on("joinedRoom", (e) => console.log(e));
  }, []);

  return (
    <h1>
      here is a game room {roomName} with {user.nickname}
    </h1>
  );
}

export default GameRoomPage;
