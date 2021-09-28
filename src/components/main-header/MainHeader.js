import React, { useEffect, useState } from "react";
import "./MainHeader.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";

function MainHeader({ loginState, setLoginState, user }) {
  const [loginText, setLoginText] = useState(
    loginState ? "로그아웃" : "로그인"
  );
  const history = useHistory();

  const goToMakeRoomPage = () => {
    history.push({
      pathname: "/make-room",
      state: { user: user },
    });
  };

  const goToLogInPage = () => {
    history.push("/login");
  };

  const goToSignUpPage = () => {
    history.push("/signup");
  };

  const requireLoginAlert = () => {
    alert("로그인이 필요합니다.");
  };

  const signOut = async () => {
    const base = axios.create({
      baseURL: config.baseURL,
      withCredentials: true,
    });

    try {
      const response = await base.get("/auth/signout");
      console.log("response: ", response);
      alert("로그아웃 되었습니다.");
      setLoginState(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginState) {
      setLoginText("로그아웃");
    } else {
      setLoginText("로그인");
    }
  }, [loginState]);

  return (
    <div className="main-header">
      <button
        className="btn room-btn"
        onClick={loginState ? goToMakeRoomPage : requireLoginAlert}
      >
        방 만들기
      </button>

      <button className="btn" onClick={loginState ? signOut : goToLogInPage}>
        {loginText}
      </button>

      <button className="btn" onClick={goToSignUpPage}>
        회원가입
      </button>
    </div>
  );
}

export default MainHeader;
