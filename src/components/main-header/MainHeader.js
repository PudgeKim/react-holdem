import React, { useEffect, useState } from "react";
import "./MainHeader.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";

function MainHeader() {
  const loginText = "로그인";
  const logoutText = "로그아웃";

  const [loginState, setLoginState] = useState("");
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

  const signOut = async () => {
    const base = axios.create({
      baseURL: config.baseURL,
      withCredentials: true,
    });

    try {
      const response = await base.get("/auth/signout");
      console.log("response: ", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const base = axios.create({
      baseURL: config.baseURL,
      withCredentials: true,
    });

    base
      .get("/auth/check-login")
      .then((info) => {
        info.data ? setLoginState(logoutText) : setLoginState(loginText);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="main-header">
      <button className="btn room-btn" onClick={goToMakeRoomPage}>
        방 만들기
      </button>

      <button
        className="btn"
        onClick={loginState === loginText ? goToLogInPage : signOut}
      >
        {loginState}
      </button>

      <button className="btn" onClick={goToSignUpPage}>
        회원가입
      </button>
    </div>
  );
}

export default MainHeader;
