import io from "socket.io-client";
import { config } from "../../config";

let socket;

export const initSocket = () => {
  socket = io(config.baseURL + "/holdem-room");
  if (socket) return true;
  else return false;
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

export const startGame = (roomId) => {
  if (socket) {
    socket.emit("startGame", {
      roomId: roomId,
    });
    console.log("startGame test!!!"); //////
  }
};

export const getFirstCardsEvent = () => {
  if (socket) {
    socket.on("getFirstCards", (data) => {
      console.log("getFirstCards data: ", data);
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
