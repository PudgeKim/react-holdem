import React from "react";
import { useHistory } from "react-router-dom";
import RoomBox from "./RoomBox";
import "./MainBodyPage.css";

function MainBodyPage({ loginState }) {
  const history = useHistory();
  const rooms = [
    { id: 1, roomName: "room1" },
    { id: 2, roomName: "room2" },
    { id: 3, roomName: "room3" },
  ];
  return (
    <ul className="room-list">
      {rooms.map((room) => (
        <RoomBox
          key={room.id}
          roomName={room.roomName}
          loginState={loginState}
        />
      ))}
    </ul>
  );
}

export default MainBodyPage;
