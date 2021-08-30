import React from "react";
import "./SignUpPage.css";

function SignUpPage() {
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
        onClick={() => {
          const inputBoxes = document.getElementsByClassName("inputBox");
          const username = inputBoxes[0].value;
          const pw = inputBoxes[1].value;
          const pw2 = inputBoxes[2].value;
          const nickname = inputBoxes[3].value;

          checkInfo(username, pw, pw2, nickname);
        }}
      >
        회원가입
      </button>
    </div>
  );
}

function checkInfo(username, pw, pw2, nickname) {
  if (pw !== pw2) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
}

export default SignUpPage;
