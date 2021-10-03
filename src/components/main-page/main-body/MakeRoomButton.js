import React from "react";
import { useHistory } from "react-router-dom";

function MakeRoomButton({ user }) {
  const history = useHistory();
  console.log("makeroombutton userId, nickname ", user);
  const onClick = () => {
    history.push({
      pathname: "/make-room",
      state: { user: user },
    });
  };

  return <button>방만들기</button>;
}
