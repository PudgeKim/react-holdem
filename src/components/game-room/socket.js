import io from "socket.io-client";
import { config } from "../../config";

let socket;

export const initSocket = () => {
  socket = io(config.baseURL + "/holdem-room");
  return socket;
};

export const joinRoom = (roomId, roomName, user) => {
  if (socket) {
    socket.emit("joinRoom", {
      roomId: roomId,
      roomName: roomName,
      userId: user.userId,
      nickname: user.nickname,
    });
    console.log("joinRoom test!"); /////
  }
};

export const leaveRoom = (roomId, user, history) => {
  if (socket) {
    socket.emit("leaveRoom", {
      roomId: roomId,
      nickname: user.nickname,
    });
    console.log("leaveroom test!"); /////
    history.goBack();
  }
};

export const addGetUsersInfoEvent = (getGamePlayers, setPlayers) => {
  if (socket) {
    socket.on("getUsersInfo", (usersInfo) => {
      console.log("getUsersInfo event !!"); /////
      console.log("usersInfo: ", usersInfo); /////
      const playerArr = getGamePlayers(usersInfo);
      setPlayers(playerArr);
    });
  }
};

export const participateGame = (roomId, nickname) => {
  if (socket) {
    socket.emit("participateGame", {
      roomId: roomId,
      nickname: nickname,
    });
    console.log("participate game!");
  }
};

export const getParticipantEvent = () => {
  if (socket) {
    socket.on("getParticipant", (data) => {
      console.log("getParticipantEvent data: ", data);
    });
  }
};

export const startGame = (roomId) => {
  if (socket) {
    socket.emit("startGame", {
      roomId: roomId,
    });
    console.log("startGame test!!!"); //////
  }
};

export const cannotStartEvent = (setGameStart) => {
  if (socket) {
    socket.on("cannotStart", (data) => {
      if (!data.success) {
        alert(data.message);
        setGameStart(false);
      }
    });
  }
};

export const getFirstCardsEvent = (
  setCard1Path,
  setCard2Path,
  setSB,
  setBB
) => {
  if (socket) {
    socket.on("getFirstCards", (data) => {
      const card1Symbol = data.card1.symbol;
      const card1Num = data.card1.num;
      const card2Symbol = data.card2.symbol;
      const card2Num = data.card2.num;

      const card1ImgPath =
        "/images/cards/" + card1Symbol + "_" + String(card1Num) + ".png";
      const card2ImgPath =
        "/images/cards/" + card2Symbol + "_" + String(card2Num) + ".png";

      console.log("card path: ", card1ImgPath, card2ImgPath); /////
      setCard1Path(card1ImgPath);
      setCard2Path(card2ImgPath);

      if (data.sb) setSB(true);
      else if (data.bb) setBB(true);
    });
  }
};

// order = 'flop' or 'turn' or 'river'
export const getCardFromDeck = (roomId, order) => {
  if (socket) {
    socket.emit("getCardFromDeck", {
      roomId: roomId,
      order: order,
    });
  }
};

export const getCardFromDeckEvent = () => {
  if (socket) {
    socket.on("getCardFromDeck", (data) => {
      console.log("listen get card from deck: ", data);
    });
  }
};
