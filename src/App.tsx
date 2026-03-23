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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="text-6xl font-semibold">{formatTime(timeLeft)}</div>
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
