import React, { useState } from "react";
import "./PlayerBox.css";

function PlayerBox({ player, imgNum }) {
  console.log("playerbox user: -------------", player);
  const [money, setMoney] = useState(player.money);
  const imagePath = "/images/ch" + String(imgNum) + ".png";
  return (
    <div className="playerBox">
      <div>{player.nickname}</div>
      <img className="playerImg" src={imagePath} alt="playerImg" />
      <div>{money}</div>
    </div>
  );
}

export default PlayerBox;
