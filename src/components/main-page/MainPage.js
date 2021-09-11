import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";
import MainHeader from "../main-header/MainHeader";
import MainBodyPage from "../main-body/MainBodyPage";

function MainPage() {
  const [loginState, setLoginState] = useState(false);

  const checkLogin = async () => {
    const base = axios.create({
      baseURL: config.baseURL,
      withCredentials: true,
    });

    base
      .get("/auth/check-login")
      .then((info) => {
        info.data ? setLoginState(true) : setLoginState(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => checkLogin(), []);

  return (
    <div className="App">
      <div>
        <MainHeader loginState={loginState} setLoginState={setLoginState} />
      </div>
      <div>
        <MainBodyPage />
      </div>
    </div>
  );
}

export default MainPage;
