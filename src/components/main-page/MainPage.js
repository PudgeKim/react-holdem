import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../config";
import MainHeader from "../main-header/MainHeader";
import MainBodyPage from "../main-body/MainBodyPage";
import { makeBaseReq } from "../../helpers/helpers";
import Cookies from "js-cookie";

function MainPage() {
  const [loginState, setLoginState] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState({
    userId: 0,
    nickname: "",
  });

  const checkLogin = async () => {
    const base = axios.create({
      baseURL: config.baseURL,
      withCredentials: true,
    });

    try {
      const response = await base.get("/auth/check-login", {
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      const user = response.data.user;
      console.log("user: ", user);
      setUser({ userId: user.id, nickname: user.nickname });
      setLoginState(true);
    } catch (error) {
      console.log(error);
      setLoginState(false);
    }
  };

  const getAllRooms = async () => {
    const base = makeBaseReq();
    try {
      const rooms = await base.get("/game/all-rooms");
      return rooms;
    } catch (error) {
      console.log(error);
      alert("네트워크 통신이 불안정하여 방 정보를 가져올 수 없습니다.");
      return [];
    }
  };

  useEffect(() => {
    async function fetchLogin() {
      await checkLogin();
    }
    async function fetchRooms() {
      const response = await getAllRooms();
      const rooms = response.data.allRooms;
      setRooms(rooms);
    }

    fetchLogin();
    fetchRooms();
  }, []);

  return (
    <div className="App">
      <div>
        <MainHeader
          loginState={loginState}
          setLoginState={setLoginState}
          user={user}
        />
      </div>
      <div>
        <MainBodyPage loginState={loginState} rooms={rooms} user={user} />
      </div>
    </div>
  );
}

export default MainPage;
