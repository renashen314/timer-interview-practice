import { useState, useRef } from "react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const FIVE_MINUTES = 5 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(FIVE_MINUTES);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    if (isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    setIsRunning(true);
  }

  function stopTimer() {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  }

  function resetTimer() {
    if (intervalRef.current === null) return;
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(FIVE_MINUTES);
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="text-6xl font-semibold">{formatTime(timeLeft)}</div>
        <div className="flex gap-4">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className="px-6 py-2 rounded-lg bg-white border border-gray-600 font-medium hover:bg-blue-300 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            disabled={!isRunning}
            className="px-6 py-2 rounded-lg bg-white border border-gray-600 font-medium hover:bg-blue-300 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 rounded-lg bg-white border border-gray-600 font-medium hover:bg-blue-300 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
