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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="text-6xl font-semibold">{formatedTime}</div>
        <div className="flex gap-4">
          <button
            onClick={startTimer}
            className="px-6 py-2 rounded-lg bg-white border border-gray-600 font-medium hover:bg-blue-300 active:scale-95 transition-all cursor-pointer"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            className="px-6 py-2 rounded-lg bg-white border border-gray-600 font-medium hover:bg-blue-300 active:scale-95 transition-all cursor-pointer"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 rounded-lg bg-white border border-gray-600 font-medium hover:bg-blue-300 active:scale-95 transition-all cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
