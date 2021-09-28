import React, { useState } from "react";
import { useHistory } from "react-router";
import "./MakeRoomPage.css";
import { makeBaseReq } from "../../helpers/helpers";
import { useLocation } from "react-router-dom";

function MakeRoomPage() {
  const history = useHistory();
  const location = useLocation();
  console.log("makeroompage location: ", location);
  const user = location.state.user;
  const [roomName, setRoomName] = useState("");
  const [warningText, setWarningText] = useState("");

  const onChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length < 2) {
      setWarningText("방 이름은 2글자 이상이어야 합니다.");
    } else {
      setWarningText("");
    }
    setRoomName(inputText);
  };

  const makeRoom = async () => {
    if (roomName.length < 2) {
      setWarningText("방 이름을 2글자 이상 입력해주세요.");
      return;
    }

    const base = makeBaseReq();

    try {
      const response = await base.post("game/create-room", {
        userId: Number(user.userId),
        nickname: user.nickname,
        roomName: roomName,
      });
      const responsedRoomId = response.data.roomId;
      const responsedRoomName = response.data.roomName;

      history.push({
        pathname: "/game-room",
        search: "?roomId=" + responsedRoomId,
        state: {
          roomId: responsedRoomId,
          roomName: responsedRoomName,
          user: user,
        },
      });
    } catch (error) {
      //const response = error.response
      console.log("makeRoomPage err: ", error);
    }
  };

  return (
    <div>
      <input
        className="inputBox"
        type="text"
        name="roomName"
        onChange={onChange}
        placeholder="방 이름"
      ></input>
      <br />
      <div className="warningDiv">{warningText}</div> <br />
      <button className="makeRoomBtn" onClick={makeRoom}>
        방 만들기
      </button>
    </div>
  );
}

export default MakeRoomPage;
