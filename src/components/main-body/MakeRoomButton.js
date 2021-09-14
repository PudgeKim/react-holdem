import React from "react";
import { useHistory } from "react-router-dom";

function MakeRoomButton({ userId, nickname }) {
  const history = useHistory();
  console.log("makeroombutton userId, nickname ", userId, nickname);
  const onClick = () => {
    history.push({
      pathname: "/make-room",
      state: { userId: userId, nickname: nickname },
    });
    //history.push("/make-room-page");
  };

  return <button>방만들기</button>;
}
