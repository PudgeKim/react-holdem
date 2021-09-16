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
  const [isHost, setHost] = useState(false);

  const setGamePlayers = (usersInfo) => {
    if (usersInfo.host === user.nickname) {
      setHost(true);
    }

    usersInfo.allUsers.map((user) => console.log);
  };

  useEffect(() => {
    socket.current = io(config.baseURL + "/holdem-room");
    socket.current.emit("joinRoom", {
      roomId: roomId,
      roomName: roomName,
      userId: user.userId,
      nickname: user.nickname,
    });
    socket.current.on("getUsersInfo", (usersInfo) => setGamePlayers);
  }, []);

  const startBtn = <button className="startBtn">게임 시작</button>;
  const waitMsg = <h3>방장이 시작하기전까지 대기중입니다...</h3>;

  return (
    <div>
      <h1>
        here is a game room {roomName} with {user.nickname}
      </h1>
      {isHost ? startBtn : waitMsg}
    </div>
  );
}

export default GameRoomPage;
