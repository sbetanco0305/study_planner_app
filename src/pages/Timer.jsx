import { useEffect, useMemo, useRef, useState } from "react";
import { useStudyPlanner } from "../context/useStudyPlanner";

const TIMER_MODES = {
  focus: 10,
  shortBreak: 5 ,
  longBreak: 8,
};

export default function Timer() {
  const { studyStats, recordFocusSession } = useStudyPlanner();

  const [mode, setMode] = useState("focus");
  const [remainingSeconds, setRemainingSeconds] = useState(TIMER_MODES.focus);
  const [isRunning, setIsRunning] = useState(false);

  const totalSecondsForMode = TIMER_MODES[mode];

  const hasRecordedSession = useRef(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);

          if (mode === "focus" && !hasRecordedSession.current) {
            hasRecordedSession.current = true;
            recordFocusSession(Math.max(1, Math.round(totalSecondsForMode / 60)));
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode, totalSecondsForMode, recordFocusSession]);

  function handleModeChange(newMode) {
    setMode(newMode);
    setRemainingSeconds(TIMER_MODES[newMode]);
    setIsRunning(false);
    hasRecordedSession.current = false;
  }

  function handleStart() {
    if (remainingSeconds > 0) {
      if (remainingSeconds === TIMER_MODES[mode]) {
        hasRecordedSession.current = false;
      }
      setIsRunning(true);
    }
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setRemainingSeconds(TIMER_MODES[mode]);
    hasRecordedSession.current = false;
  }

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [remainingSeconds]);

  return (
    <section className="page-section timer-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Study Timer</p>
          <h1>Stay focused with structured sessions</h1>
          <p className="page-subtitle">
            Choose a study mode, start the timer, and track completed focus sessions.
          </p>
        </div>
      </div>

      <div className="timer-card">
        <div className="timer-mode-buttons">
          <button
            className={mode === "focus" ? "active" : ""}
            onClick={() => handleModeChange("focus")}
          >
            Focus
          </button>
          <button
            className={mode === "shortBreak" ? "active" : ""}
            onClick={() => handleModeChange("shortBreak")}
          >
            Short Break
          </button>
          <button
            className={mode === "longBreak" ? "active" : ""}
            onClick={() => handleModeChange("longBreak")}
          >
            Long Break
          </button>
        </div>

        <div className="timer-display">{formattedTime}</div>

        <div className="timer-controls">
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <h3>Focus Sessions Today</h3>
          <p>{studyStats.focusSessionsToday}</p>
        </article>

        <article className="stat-card">
          <h3>Study Minutes Today</h3>
          <p>{studyStats.studyMinutesToday}</p>
        </article>

        <article className="stat-card">
          <h3>Total Study Minutes</h3>
          <p>{studyStats.totalStudyMinutes}</p>
        </article>

        <article className="stat-card">
          <h3>Current Streak</h3>
          <p>{studyStats.streakDays}</p>
        </article>
      </div>
    </section>
  );
}