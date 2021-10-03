import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./GameRoomPage.css";
import PlayerBoxes from "./PlayerBoxes";
import {
  addGetUsersInfoEvent,
  emitBetMoney,
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
  const [userMoney, setUserMoney] = useState(0);
  const [isHost, setHost] = useState(false);
  const [isGameStart, setGameStart] = useState(false);
  const [players, setPlayers] = useState([]);
  const [card1ImgPath, setCard1Path] = useState(null);
  const [card2ImgPath, setCard2Path] = useState(null);
  const [isSB, setSB] = useState(false);
  const [isBB, setBB] = useState(false);
  const [isParticipated, setParticipate] = useState(false);
  const refBetMoney = useRef("0");

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
        // setMoney
        const money = users[i].money;
        setUserMoney(money);
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

  const betOnChange = (e) => {
    refBetMoney.current.value = e.target.value;
  };

  const betMoneyOnClick = (roomId, betMoney, userMoney) => {
    if (isValidBetInput) {
      const calculated = betMoney * 10000;
      console.log("calculated: ", calculated); /////
      console.log("betMoney: ", userMoney); ///////
      if (calculated <= userMoney) {
        emitBetMoney(roomId, user.nickname, calculated);
      } else {
        alert("재산을 초과한 베팅입니다.");
      }
    } else {
      alert("소수점 없는 숫자만 입력해주세요.");
    }
  };

  const isValidBetInput = (betMoney) => {
    const parsed = parseInt(betMoney);
    console.log("parsed money: ", parsed);
    if (isNaN(parsed)) {
      // 유효하지 않은 input
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    const socket = initSocket();
    if (socket) {
      socket.on("connect", () => {
        addGetUsersInfoEvent(getGamePlayers, setPlayers, setUserMoney);
        getParticipantEvent(user.nickname, setParticipate);
        cannotStartEvent(setGameStart);
        getFirstCardsEvent(setCard1Path, setCard2Path, setSB, setBB);
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

  const participateMsg = <h3>참가중..</h3>;
  const participateBtn = (
    <button
      onClick={() => {
        participateGame(roomId, user.nickname);
      }}
    >
      게임 참가
    </button>
  );

  const playerCards = (
    <div>
      <div className="playerCard">
        <img className="cardImg" src={card1ImgPath} alt="card1Img" />
      </div>

      <div className="playerCard">
        <img className="cardImg" src={card2ImgPath} alt="card2Img" />
      </div>

      <input ref={refBetMoney} type="text" />
      <span>(만)</span>
      <button className="betBtn">베팅</button>
    </div>
  );

  return (
    <div>
      <div className="container">
        <img className="tableImg" src="/images/table.png" alt="loading.." />
        {msgBeforeStart}
        <PlayerBoxes players={players} />
      </div>

      {isParticipated ? participateMsg : participateBtn}
      <br />

      {/* 게임이 시작되고 참가버튼을 눌러야만 카드와 베팅 칸이 보임 */}
      {isGameStart && isParticipated ? (
        <div>
          <div className="playerCard">
            <img className="cardImg" src={card1ImgPath} alt="card1Img" />
          </div>

          <div className="playerCard">
            <img className="cardImg" src={card2ImgPath} alt="card2Img" />
          </div>

          <div className="betBox">
            <input ref={refBetMoney} type="text" onChange={betOnChange} />
            <span>(만)</span>
            <button
              onClick={() => {
                betMoneyOnClick(roomId, refBetMoney.current.value, userMoney);
              }}
            >
              베팅
            </button>
            <br />
          </div>
        </div>
      ) : (
        <div></div>
      )}

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
