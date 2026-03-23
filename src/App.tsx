import { useState, useRef, useEffect } from "react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const FIVE_MINUTES = 5 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(() => {
    return FIVE_MINUTES;
  });
  const [isRunning, setIsRunning] = useState(false);

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && interval.current == null) {
      interval.current = setInterval(() => {
        setTimeLeft((p) => {
          if (p <= 1) {
            clearInterval(interval.current!);
            interval.current = null;
            setIsRunning(false);
            return 0;
          }
          return p - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval.current !== null) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [timeLeft, isRunning]);

  function startTimer() {
    setIsRunning(true);
  }

  function stopTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    clearInterval(interval.current!);
    setTimeLeft(FIVE_MINUTES);
  }

  return (
    <>
      <div>{formatTime(timeLeft)}</div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  );
}

export default App;
