import React from "react";
import "./RoomBox.css";

function RoomBox({ roomName, loginState }) {
  const enterRoom = () => {
    alert("참가 완료");
  };

  const requireLoginAlert = () => {
    alert("로그인이 필요합니다.");
  };
  return (
    <div className="roomBox">
      <div>{roomName}</div>
      <button onClick={loginState ? enterRoom : requireLoginAlert}>참가</button>
    </div>
  );
}

export default RoomBox;
