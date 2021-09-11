import React from "react";
import { useHistory } from "react-router-dom";
import { errors } from "../../errors/errors";
import { makeBaseReq } from "../../helpers/helpers";
import "./SignUpPage.css";

function SignUpPage() {
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
      <input
        className="inputBox"
        type="password"
        name="password2"
        placeholder="비밀번호 확인"
      ></input>
      <br />
      <input
        className="inputBox"
        type="text"
        name="nickname"
        placeholder="닉네임"
      ></input>
      <br />
      <button
        className="submitBtn"
        onClick={async () => {
          const inputBoxes = document.getElementsByClassName("inputBox");
          const username = inputBoxes[0].value;
          const pw = inputBoxes[1].value;
          const pw2 = inputBoxes[2].value;
          const nickname = inputBoxes[3].value;

          const isRegistered = await checkInfo(username, pw, pw2, nickname);

          if (isRegistered) {
            history.push("/");
          }
        }}
      >
        회원가입
      </button>
    </div>
  );
}

async function checkInfo(username, pw, pw2, nickname) {
  if (pw !== pw2) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }

  const base = makeBaseReq();

  try {
    await base.post("auth/signup", {
      username: username,
      password: pw,
      nickname: nickname,
    });
    alert("회원가입이 완료되었습니다.");
    return true;
  } catch (error) {
    const response = error.response.data;

    // nest의 class-validator로 잡는 에러는 배열로 옴
    for (let i = 0; i < response.message.length; i += 1) {
      if (response.message[i] === errors.INVALID_NICKNAME) {
        alert("닉네임은 2자 이상어야합니다.");
        return false;
      }

      if (response.message[i] === errors.INVALID_PASSWORD) {
        alert("비밀번호는 6자 이상이어야합니다.");
        return false;
      }
    }

    if (response.message === errors.DUPLICATE_USERNAME) {
      alert("이미 존재하는 아이디입니다.");
      return false;
    }

    if (response.message === errors.DUPLICATE_NICKNAME) {
      alert("이미 존재하는 닉네임입니다.");
      return false;
    }

    alert("알 수 없는 오류가 발생했습니다. ", error);
    return false;
  }
}

export default SignUpPage;
