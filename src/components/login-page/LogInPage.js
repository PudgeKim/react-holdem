import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
import { errors } from "../../errors/errors";
import "./LogInPage.css";

function LogInPage() {
  const history = useHistory();

  return (
    <div>
      <input
        className="inputBox"
        type="text"
        name="username"
        placeholder="아이디"
      ></input>
      <br />
      <input
        className="inputBox"
        type="password"
        name="password"
        placeholder="비밀번호"
      ></input>
      <br />

      <button
        className="submitBtn"
        onClick={async () => {
          const inputBoxes = document.getElementsByClassName("inputBox");
          const username = inputBoxes[0].value;
          const pw = inputBoxes[1].value;

          await checkLogin(username, pw);

          history.push("/");
        }}
      >
        로그인
      </button>
    </div>
  );
}

async function checkLogin(username, password) {
  const base = axios.create({
    baseURL: config.baseURL,
    withCredentials: true,
  });

  try {
    await base.post("auth/signin", {
      username: username,
      password: password,
    });
  } catch (error) {
    console.log("error.response: ", error);
    const response = error.response.data;

    if (response.message === errors.DUPLICATE_USERNAME) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }

    if (response.message === errors.WRONG_PASSWORD) {
      alert("잘못된 비밀번호입니다.");
      return;
    }

    alert("알 수 없는 오류가 발생했습니다. ", error);
  }
}

export default LogInPage;
