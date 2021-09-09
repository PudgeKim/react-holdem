import React from "react";
import "./RoomBox.css";

function RoomBox(props) {
  return (
    <div className="roomBox">
      <div>{props.roomName}</div>
      <button>참가</button>
    </div>
  );
}

export default RoomBox;
