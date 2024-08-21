import { useState } from "react";
import Player from "./components.jsx/player";
import GameBoard from "./components.jsx/Gameboard";
import Log from "./components.jsx/Log";
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from "./components.jsx/GameOver";

let x = [];
let o = [];
let winner=null;

function checkwinner(array1, playeralphabet) {
  for (let i of WINNING_COMBINATIONS) {
    let count1 = 0;
    for (let j of i) {
      if (array1.find(element => element.row === j.row && element.column === j.column)) {
        count1 += 1;
      }
      if (count1 === 3) {
        //alert(`${playeralphabet} Jeichitan pa`);
        winner = playeralphabet;
        return;
      }
    }
  }
  if (array1.length >= 5 && !winner) {
    winner = "None";
  }
}


function derivefromTurns(turns) {
  let currentmove = turns[0];
  if (currentmove) {
    console.log(currentmove.square, currentmove.player);

    if (currentmove.player === 'X') {
      x.push(currentmove.square);
    }

    if (currentmove.player === 'O') {
      o.push(currentmove.square);
    }
  }

  console.log('X', x);
  console.log('O', o);
  console.log("\n");

  if (x.length >= 3) checkwinner(x, 'X');
  if (o.length >= 3) checkwinner(o, 'O');
}

function App() {
  function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }

    return currentPlayer;
  }

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, columnIndex) {
    if (winner) return; // If there's a winner, do not allow more moves

    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, column: columnIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  derivefromTurns(gameTurns);

  function handleRematch(){
    setGameTurns([]);
    x = [];
    o = [];
    winner = null; // Reset winner
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player InitialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player InitialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        <GameOver winner={winner} onRematch={handleRematch}/>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
