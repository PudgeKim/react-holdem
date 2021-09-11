import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
import { errors } from "../../errors/errors";

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

          const isSuccess = await checkLogin(username, pw);
          if (isSuccess) {
            history.push("/");
          }
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
    const response = await base.post("auth/signin", {
      username: username,
      password: password,
    });
    if (response.data.success) {
      return true;
    } else {
      console.log(response.data);
      return false;
    }
  } catch (error) {
    console.log("error.response: ", error);
    const response = error.response.data;

    if (response.message === errors.NON_EXISTENT_USERNAME) {
      alert("존재하지 않는 아이디입니다.");
      return false;
    }

    if (response.message === errors.WRONG_PASSWORD) {
      alert("잘못된 비밀번호입니다.");
      return false;
    }

    alert("알 수 없는 오류가 발생했습니다. ", error);
    return false;
  }
}

export default LogInPage;
