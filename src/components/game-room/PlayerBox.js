import React, { useState } from "react";
import "./PlayerBox.css";

function PlayerBox({ player, imgNum }) {
  const convertedMoney = convertMoney(player.money);
  const [money, setMoney] = useState(convertedMoney);
  const imagePath = "/images/ch" + String(imgNum) + ".png";
  const playerBoxClass = "playerBox playerBox" + String(imgNum); // to locate each box differently
  return (
    <div className={playerBoxClass}>
      <div className="nickname">{player.nickname}</div>
      <img className="playerImg" src={imagePath} alt="playerImg" />
      <div className="money">{money}</div>
    </div>
  );
}

const convertMoney = (money) => {
  money = money / 10000;
  const converted = String(money) + "만";
  return converted;
};

export default PlayerBox;
