import React from 'react';

export default function GameOver({ winner,onRematch }) {
  if (winner && winner !== "None") {
    return (
      <div id="game-over">
        <h2>Game Over</h2>
        <p>{winner} won !!</p>
        <p>
            <button onClick={onRematch}> Rematch</button>
        </p>
      </div>
    );
  } else if (winner === "None") {
    return (
      <div id="game-over">
        <h2>Game Over</h2>
        <p>Game Draw</p>
        <p>
            <button onClick={onRematch}>Rematch</button>
        </p>
      </div>
    );
  } else {
    return null;
  }
}
