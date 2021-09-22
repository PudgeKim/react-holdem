import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
//import io from "socket.io-client";
//import { config } from "../../config";
import "./GameRoomPage.css";
import PlayerBoxes from "./PlayerBoxes";
import { addGetUsersInfoEvent, initSocket, leaveRoom } from "./socket";

//const socket = io(config.baseURL + "/holdem-room");

function GameRoomPage() {
  const history = useHistory();
  //const socket = useRef(null);
  const location = useLocation();
  const roomId = location.state.roomId;
  const roomName = location.state.roomName;
  const user = location.state.user;
  const [isHost, setHost] = useState(false);
  const [isGameStart, setGameStart] = useState(false);
  //let leave;
  //socket = io(config.baseURL + "/holdem-room");

  const [players, setPlayers] = useState([]);

  const gameStart = () => {
    setGameStart(true);
  };

  const getGamePlayers = (usersInfo) => {
    if (usersInfo.host === user.nickname) {
      setHost(true);
    }

    const users = usersInfo.allUsers;
    let meIdx = -1; // 자신을 나타내는 인덱스 (자기의 플레이어가 중앙에 가기 위함)
    const playerArr = []; // 자신의 플레이어가 인덱스 0에 들어가게 되는 리스트
    for (let i = 0; i < users.length; i++) {
      if (users[i].nickname === user.nickname) {
        meIdx = i;
      }

      if (meIdx !== -1) {
        playerArr.push(users[i]);
      }
    }

    for (let i = 0; i < meIdx; i++) {
      playerArr.push(users[i]);
    }

    return playerArr;
  };

  // const leaveRoom = () => {
  //   socket.emit("leaveRoom", {
  //     roomId: roomId,
  //     nickname: user.nickname,
  //   });

  //   history.goBack();
  // };

  useEffect(() => {
    // socket.emit("joinRoom", {
    //   roomId: roomId,
    //   roomName: roomName,
    //   userId: user.userId,
    //   nickname: user.nickname,
    // });
    // socket.on("getUsersInfo", (usersInfo) => {
    //   console.log("getUsersInfo event !!");
    //   const playerArr = getGamePlayers(usersInfo);
    //   setPlayers(playerArr);
    // });
    initSocket(roomId, roomName, user);
    addGetUsersInfoEvent(getGamePlayers, setPlayers);
  }, []);

  const startBtn = (
    <button className="startBtn" onClick={gameStart}>
      게임 시작
    </button>
  );
  const waitMsg = (
    <h3 className="waitBox">방장이 시작하기전까지 대기중입니다...</h3>
  );

  let msgBeforeStart = waitMsg;
  if (isHost && !isGameStart) {
    msgBeforeStart = startBtn;
  } else if (!isHost && !isGameStart) {
    msgBeforeStart = waitMsg;
  } else {
    msgBeforeStart = null; // 게임이 시작되면 가림
  }

  return (
    <div>
      <div className="container">
        <img className="tableImg" src="/images/table.png" alt="loading.." />
        {msgBeforeStart}
        <PlayerBoxes players={players} />
      </div>

      <button
        className="leaveBtn"
        onClick={() => {
          leaveRoom(roomId, user, history);
        }}
      >
        나가기
      </button>
    </div>
  );
}

export default GameRoomPage;
