import React from "react";
import PlayerBox from "./PlayerBox";
import "./PlayerBoxes.css";

function PlayerBoxes({ players }) {
  let imgNum = 1;
  return (
    <div className="playerBoxes">
      {players.map((player) => {
        return (
          <PlayerBox key={player.nickname} player={player} imgNum={imgNum++} />
        );
      })}
    </div>
  );
}

export default PlayerBoxes;
