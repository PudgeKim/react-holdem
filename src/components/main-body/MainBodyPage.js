import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoomBox from "./RoomBox";
import "./MainBodyPage.css";
import { makeBaseReq } from "../../helpers/helpers";

function MainBodyPage({ loginState, rooms }) {
  //const history = useHistory();
  // const [rooms, setRooms] = useState([]);

  // const getAllRooms = async () => {
  //   const base = makeBaseReq();
  //   try {
  //     const rooms = await base.get("/game/all-rooms");
  //     return rooms;
  //   } catch (error) {
  //     console.log(error);
  //     alert("네트워크 통신이 불안정하여 방 정보를 가져올 수 없습니다.");
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   async function fetchRooms() {
  //     const response = await getAllRooms();
  //     const rooms = response.data.allRooms;
  //     setRooms(rooms);
  //   }
  //   fetchRooms();
  // }, []);

  return (
    <ul className="room-list">
      {rooms.map((room) => (
        <RoomBox
          key={room.roomId}
          roomId={room.roomId}
          roomName={room.roomName}
          host={room.host}
          loginState={loginState}
        />
      ))}
    </ul>
  );
}

export default MainBodyPage;
