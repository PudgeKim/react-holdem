import React from "react";
import PlayerBox from "./PlayerBox";

function PlayerBoxes({ players }) {
  console.log("playerboxes: ", players);
  let imgNum = 1;
  return (
    <ul className="playerBoxes">
      {players.map((player) => {
        return <PlayerBox player={player} imgNum={imgNum++} />;
      })}
    </ul>
  );
}

export default PlayerBoxes;
