import { useEffect, useMemo, useRef, useState } from "react";
import { useStudyPlanner } from "../context/useStudyPlanner";

const TIMER_MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export default function Timer() {
  const { studyStats, recordFocusSession } = useStudyPlanner();

  const [mode, setMode] = useState("focus");
  const [remainingSeconds, setRemainingSeconds] = useState(TIMER_MODES.focus);
  const [isRunning, setIsRunning] = useState(false);
  const hasRecordedSession = useRef(false);

  const totalSecondsForMode = TIMER_MODES[mode];

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
    <section className="timer-page">
      <h1 className="timer-page-title">Study Timer</h1>

      <div className="timer-panel">
        <div className="timer-mode-buttons">
          <button
            className={`timer-mode-button ${mode === "focus" ? "active" : ""}`}
            onClick={() => handleModeChange("focus")}
          >
            Focus 
          </button>

          <button
            className={`timer-mode-button ${mode === "shortBreak" ? "active" : ""}`}
            onClick={() => handleModeChange("shortBreak")}
          >
            Short Break
          </button>

          <button
            className={`timer-mode-button ${mode === "longBreak" ? "active" : ""}`}
            onClick={() => handleModeChange("longBreak")}
          >
            Long Break
          </button>
        </div>

        <div className="timer-circle">
          <span className="timer-display">{formattedTime}</span>
        </div>

        <div className="timer-controls">
          {!isRunning ? (
            <button className="timer-action-button primary" onClick={handleStart}>
              Start
            </button>
          ) : (
            <button className="timer-action-button primary" onClick={handlePause}>
              Pause
            </button>
          )}

          <button className="timer-action-button secondary" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="timer-summary-card">
          <div className="timer-summary-item">
            <p className="timer-summary-label">Sessions Completed Today</p>
            <p className="timer-summary-value">{studyStats.focusSessionsToday}</p>
          </div>

          <div className="timer-summary-item align-right">
            <p className="timer-summary-label">Study Time Today</p>
            <p className="timer-summary-value">{studyStats.studyMinutesToday} min</p>
          </div>
        </div>
      </div>
    </section>
  );
}