import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


export default function GameBoard({onSelectSquare,turns}) {
    let gameBoard = [...initialGameBoard.map(array=>[...array])];

    for (const turn of turns) {
    const {square,player} = turn;
    const {row,column} = square;

    gameBoard[row][column] = player;
    }
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectedSquare(rowIndex, columnIndex) {
    //     setGameBoard(prevGameBoard => {
    //         // Create a deep copy of the game board
    //         const updatedBoard = prevGameBoard.map(innerArray => [...innerArray]);
    //         // Update the specific cell
    //         updatedBoard[rowIndex][columnIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => (
                            <li key={columnIndex}>
                                <button onClick={()=>onSelectSquare(rowIndex,columnIndex)} disabled={playerSymbol!==null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}