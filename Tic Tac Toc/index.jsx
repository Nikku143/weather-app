import React, { useState } from "react";

export default function TicTacToe() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(board);

  function handleClick(i) {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function restart() {
    setBoard(emptyBoard);
    setXIsNext(true);
  }

  function renderSquare(i) {
    return (
      <button
        key={i}
        onClick={() => handleClick(i)}
        style={{
          width: "80px",
          height: "80px",
          fontSize: "2rem",
          fontWeight: "bold",
          border: "1px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        {board[i]}
      </button>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h1>Tic Tac Toe</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 80px)" }}>
        {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
      </div>
      <h2>
        {winner
          ? `Winner: ${winner}`
          : board.every(Boolean)
          ? "Draw!"
          : `Next Player: ${xIsNext ? "X" : "O"}`}
      </h2>
      <button
        onClick={restart}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1rem" }}
      >
        Restart
      </button>
    </div>
  );
}
