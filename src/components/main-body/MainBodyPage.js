import React from "react";
import RoomBox from "./RoomBox";
import "./MainBodyPage.css";

function MainBodyPage({ loginState, rooms, user }) {
  return (
    <ul className="room-list">
      {rooms.map((room) => (
        <RoomBox
          key={room.roomId}
          roomId={room.roomId}
          roomName={room.roomName}
          host={room.host}
          loginState={loginState}
          user={user}
        />
      ))}
    </ul>
  );
}

export default MainBodyPage;
