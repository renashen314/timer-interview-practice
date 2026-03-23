import { useState, useRef, useEffect } from "react";

function App() {
  const FIVE_MINUTES = new Date(0, 0, 0, 0, 5);

  const [timeLeft, setTimeLeft] = useState(FIVE_MINUTES);

  const formatedTime = Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    second: "numeric",
  }).format(timeLeft);

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    if (interval.current !== null) return;

    interval.current = window.setInterval(() => {
      setTimeLeft(
        (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() - 1000),
      );
    }, 1000);
  }

  function stopTimer() {
    if (interval.current == null) return;
    clearInterval(interval.current);
    interval.current = null;
  }

  function resetTimer() {
    if (interval.current !== null) {
      clearInterval(interval.current);
    }
    setTimeLeft(FIVE_MINUTES);
    interval.current = null;
  }

  useEffect(() => {
    return () => {
      if (interval.current !== null) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <>
      <div>{formatedTime}</div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  );
}

export default App;
