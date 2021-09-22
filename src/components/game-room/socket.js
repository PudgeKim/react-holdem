import io from "socket.io-client";
import { config } from "../../config";

let socket;

export const initSocket = (roomId, roomName, user) => {
  socket = io(config.baseURL + "/holdem-room");
  if (socket) {
    socket.emit("joinRoom", {
      roomId: roomId,
      roomName: roomName,
      userId: user.userId,
      nickname: user.nickname,
    });
    console.log("initSocket test!");
  }
};

export const leaveRoom = (roomId, user, history) => {
  if (socket) {
    socket.emit("leaveRoom", {
      roomId: roomId,
      nickname: user.nickname,
    });
    console.log("leaveroom test!");
    history.goBack();
  }
};

export const addGetUsersInfoEvent = (getGamePlayers, setPlayers) => {
  if (socket) {
    socket.on("getUsersInfo", (usersInfo) => {
      console.log("getUsersInfo event !!");
      console.log("usersInfo: ", usersInfo);
      const playerArr = getGamePlayers(usersInfo);
      setPlayers(playerArr);
    });
  }
};
