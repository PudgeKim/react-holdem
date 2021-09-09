import React from "react";
import { useHistory } from "react-router-dom";

function MakeRoomButton() {
  const history = useHistory();

  const onClick = () => {
    history.push("/make-room-page");
  };

  return <button>방만들기</button>;
}
