import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./GameRoomPage.css";
import PlayerBoxes from "./PlayerBoxes";
import {
  addGetUsersInfoEvent,
  cannotStartEvent,
  getCardFromDeck,
  getCardFromDeckEvent,
  getFirstCardsEvent,
  getParticipantEvent,
  initSocket,
  joinRoom,
  leaveRoom,
  participateGame,
  startGame,
} from "./socket";

function GameRoomPage() {
  const history = useHistory();
  const location = useLocation();
  // MakeRoomPage에서 넘어온 userId
  const roomId = location.state.roomId;
  const roomName = location.state.roomName;
  const user = location.state.user;
  const [isHost, setHost] = useState(false);
  const [isGameStart, setGameStart] = useState(false);

  const [players, setPlayers] = useState([]);

  const gameStartOnClick = () => {
    startGame(roomId);
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

  useEffect(() => {
    const socket = initSocket();
    if (socket) {
      socket.on("connect", () => {
        addGetUsersInfoEvent(getGamePlayers, setPlayers);
        getParticipantEvent();
        cannotStartEvent(setGameStart);
        getFirstCardsEvent();
        getCardFromDeckEvent();
        joinRoom(roomId, roomName, user);
      });
    } else {
      alert("socket is not connected");
    }
  }, []);

  const startBtn = (
    <button className="startBtn" onClick={gameStartOnClick}>
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
        onClick={() => {
          participateGame(roomId, user.nickname);
        }}
      >
        게임 참가
      </button>

      <button
        onClick={() => {
          getCardFromDeck(roomId, "flop");
        }}
      >
        getCard
      </button>

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
