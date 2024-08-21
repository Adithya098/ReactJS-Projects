import React from 'react';
import '../index.css'; // Adjust the path according to your project structure


export default function ResultModal({ result, targettime, remainingtime }) {
  const userlost = remainingtime <= 0;
  const score = Math.round(((targettime - remainingtime) / targettime) * 100);
  
  return (
    <dialog className="result-modal" open>
      {userlost ? <h2>You Lost</h2> : <h2>Your score: {score}</h2>}
      <p>The target time was <strong>{targettime}</strong> seconds.</p>
      <p>You stopped the timer with <strong>{remainingtime} seconds left.</strong></p>
      <progress value={targettime - remainingtime} max={targettime}></progress>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
