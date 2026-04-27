import { useEffect, useMemo, useRef, useState } from "react";
import { useStudyPlanner } from "../context/useStudyPlanner";

const TIMER_MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

function getSavedTimerState() {
  try {
    return JSON.parse(sessionStorage.getItem("timerState")) || {};
  } catch {
    return {};
  }
}

export default function Timer() {
  const { studyStats, recordFocusSession } = useStudyPlanner();

  const savedTimerState = getSavedTimerState();

  const [mode, setMode] = useState(savedTimerState.mode || "focus");

  const [remainingSeconds, setRemainingSeconds] = useState(
    savedTimerState.remainingSeconds ?? TIMER_MODES[savedTimerState.mode || "focus"]
  );

  const [isRunning, setIsRunning] = useState(false);

  const hasRecordedSession = useRef(false);

  const [focusSessionsInCycle, setFocusSessionsInCycle] = useState(
    savedTimerState.focusSessionsInCycle ?? 0
  );

  const hasCompletedCurrentRun = useRef(false);

  const totalSecondsForMode = TIMER_MODES[mode];

  const radius = 170;
  const circumference = 2 * Math.PI * radius;
  const progress = remainingSeconds / totalSecondsForMode;
  const strokeDashoffset = circumference * (1 - progress);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);

          if (!hasCompletedCurrentRun.current) {
            hasCompletedCurrentRun.current = true;
            handleSessionComplete();
          }
        
          return 0;
        }

        return Math.max(prev - 0.1, 0);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, mode, totalSecondsForMode, recordFocusSession]);

  useEffect(() => {
    sessionStorage.setItem(
      "timerState",
      JSON.stringify({
        mode,
        remainingSeconds,
        isRunning,
        focusSessionsInCycle,
      })
    );
  }, [mode, remainingSeconds, isRunning, focusSessionsInCycle]);

  function handleModeChange(newMode) {
    setMode(newMode);
    setRemainingSeconds(TIMER_MODES[newMode]);
    setIsRunning(false);
    hasRecordedSession.current = false;
    hasCompletedCurrentRun.current = false;
  }

  function handleStart() {
    if (remainingSeconds > 0) {
      hasCompletedCurrentRun.current = false;

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
    hasCompletedCurrentRun.current = false;
  }

  function handleSessionComplete() {
    playCompletionSound();

    if (mode === "focus") {
      if (!hasRecordedSession.current) {
        hasRecordedSession.current = true;

        const minutesStudied = totalSecondsForMode / 60;
        recordFocusSession(minutesStudied);
      }

      setFocusSessionsInCycle((prev) => {
        const nextCount = prev + 1;

        if (nextCount >= 4) {
          setMode("longBreak");
          setRemainingSeconds(TIMER_MODES.longBreak);
          return 4;
        }

        setMode("shortBreak");
        setRemainingSeconds(TIMER_MODES.shortBreak);
        return nextCount;
      });
    } else {
      if (mode === "longBreak") {
        setFocusSessionsInCycle(0);
      }

      setMode("focus");
      setRemainingSeconds(TIMER_MODES.focus);
    }

    setIsRunning(false);
  }

  function playCompletionSound() {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 880;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  function formatStudyTime(minutes) {
    if (minutes < 1) {
      return `${Math.round(minutes * 60)} sec`;
    }

    return `${Math.round(minutes)} min`;
  }

  const formattedTime = useMemo(() => {
    const displaySeconds = Math.ceil(remainingSeconds);
    const minutes = Math.floor(displaySeconds / 60);
    const seconds = displaySeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [remainingSeconds]);

  return (
    <section className={`timer-page ${mode}`}>
      <div className="timer-page-header">
        <h1 className="timer-page-title">Study Timer</h1>
        <p className="timer-page-subtitle">
          Use focused study sessions and scheduled breaks to stay productive.
        </p>
      </div>

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

        <p className="timer-cycle-note">
          {mode === "focus" &&
            `Pomodoro cycle: ${focusSessionsInCycle}/4 focus sessions completed`}

          {mode === "shortBreak" &&
            `Short break — ${focusSessionsInCycle}/4 focus sessions completed`}

          {mode === "longBreak" &&
            "Long break earned — 4/4 focus sessions completed"}
        </p>

        <p className={`timer-status ${mode}`}>
          {mode === "focus" && "Focus time — stay locked in 🔒"}
          {mode === "shortBreak" && "Short break — relax a bit ☕"}
          {mode === "longBreak" && "Long break — you earned it 🎉"}
        </p>

        <div className="timer-circle">
          <svg className="timer-progress-ring" viewBox="0 0 380 380">
            <circle
              className="timer-progress-ring-bg"
              cx="190"
              cy="190"
              r={radius}
            />
            <circle
              className={`timer-progress-ring-fill ${mode}`}
              cx="190"
              cy="190"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

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
            <p className="timer-summary-value">
              {formatStudyTime(studyStats.studyMinutesToday)}
            </p>
          </div>
        </div>
      </div>

      <div className="timer-how-it-works">
        <h2>How it Works</h2>
        <ul>
          <li>Focus Time: 25 minutes of concentrated study</li>
          <li>Short Break: 5 minutes to rest and recharge</li>
          <li>Long Break: 15 minutes after completing 4 focus sessions</li>
          <li>The timer automatically moves you through the Pomodoro cycle</li>
        </ul>
      </div>
    </section>
  );
}