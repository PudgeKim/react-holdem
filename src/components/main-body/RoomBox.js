import React from "react";
import { useHistory } from "react-router-dom";
import "./RoomBox.css";

function RoomBox({ roomName, host, loginState }) {
  const history = useHistory();
  const enterRoom = () => {
    history.push({
      pathname: "/game-room",
      search: "?room=" + roomName,
      state: { roomName: roomName },
    });
  };

  const requireLoginAlert = () => {
    alert("로그인이 필요합니다.");
  };
  return (
    <div className="roomBox">
      <div className="roomText">{roomName}</div>
      <div className="hostText">{host}님의 방</div>
      <button
        className="joinBtn"
        onClick={loginState ? enterRoom : requireLoginAlert}
      >
        참가
      </button>
    </div>
  );
}

export default RoomBox;
