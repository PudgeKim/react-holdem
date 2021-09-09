import React, { useState } from "react";
import Cookies from "js-cookie";
import "./MainHeader.css";
import { useHistory } from "react-router-dom";

const loginText = "로그인";
const logoutText = "로그아웃";

function MainHeader() {
  const accessToken = Cookies.get("accessToken");

  let initialText;
  if (accessToken === undefined) {
    initialText = loginText;
  } else {
    initialText = logoutText;
  }

  const [signInText, setClick] = useState(initialText);
  const history = useHistory();

  const goToMakeRoomPage = () => {
    history.push("/make-room");
  };

  const goToLogInPage = () => {
    history.push("/login");
  };

  const goToSignUpPage = () => {
    history.push("/signup");
  };

  return (
    <div className="main-header">
      <button className="btn room-btn" onClick={goToMakeRoomPage}>
        방 만들기
      </button>

      <button className="btn" onClick={goToLogInPage}>
        {signInText}
      </button>

      <button className="btn" onClick={goToSignUpPage}>
        회원가입
      </button>
    </div>
  );
}

export default MainHeader;
