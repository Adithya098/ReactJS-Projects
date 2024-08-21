import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(targetTime);

  const timer = useRef({});

  function handleStart() {
    setTimerStarted(true);
    setTimerExpired(false); // Reset expired state when starting a new timer
    setRemainingTime(targetTime); // Reset remaining time when starting a new timer

    timer.current.startTime = Date.now();
    timer.current.id = setTimeout(() => {
      setTimerExpired(true);
      setTimerStarted(false);
      setRemainingTime(0);
    }, 1000 * targetTime);
  }

  function handleEnd() {
    clearTimeout(timer.current.id);
    setTimerStarted(false);
    const timeElapsed = Math.round((Date.now() - timer.current.startTime) / 1000);
    setRemainingTime(Math.max(targetTime - timeElapsed, 0)); // Ensure remaining time is not negative
    setTimerExpired(true);
  }

  return (
    <>
      {timerExpired && <ResultModal targettime={targetTime} result="lost" remainingtime={remainingTime} />}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerStarted ? handleEnd : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerStarted ? 'active' : 'inactive'}>
          {timerStarted ? 'Timer is running' : 'Timer is inactive'}
        </p>
      </section>
    </>
  );
}
