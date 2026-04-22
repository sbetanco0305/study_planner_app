import { useMemo } from "react";
import { useStudyPlanner } from "../context/useStudyPlanner";

const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Statistics() {
  const { studyStats, assignments, dashboardStats } = useStudyPlanner();

  const completedTasks = useMemo(
    () => assignments.filter((assignment) => assignment.completed).length,
    [assignments]
  );

  const weeklyData = useMemo(() => {
    return WEEK_LABELS.map((label, index) => ({
      label,
      minutes: studyStats.weeklyMinutes?.[index] ?? 0,
    }));
  }, [studyStats.weeklyMinutes]);

  const maxMinutes = Math.max(...weeklyData.map((day) => day.minutes), 1);

  return (
    <section className="statistics-page">
      <h1 className="statistics-page-title">Statistics</h1>

      <div className="statistics-grid">
        <article className="statistics-card primary">
          <p className="statistics-label">Focus Sessions Today</p>
          <h2>{studyStats.focusSessionsToday}</h2>
        </article>

        <article className="statistics-card primary">
          <p className="statistics-label">Study Minutes Today</p>
          <h2>{studyStats.studyMinutesToday}</h2>
        </article>

        <article className="statistics-card primary">
          <p className="statistics-label">Total Study Minutes</p>
          <h2>{studyStats.totalStudyMinutes}</h2>
        </article>

        <article className="statistics-card primary">
          <p className="statistics-label">Streak Days</p>
          <h2>{studyStats.streakDays}</h2>
        </article>

        <article className="statistics-card secondary">
          <p className="statistics-label">Completed Tasks</p>
          <h2>{completedTasks}</h2>
        </article>

        <article className="statistics-card secondary">
          <p className="statistics-label">Assignment Completion Rate</p>
          <h2>{dashboardStats.completionRate}%</h2>
        </article>
      </div>

      <div className="weekly-progress-card">
        <div className="weekly-progress-header">
          <div>
            <p className="statistics-label">Weekly Study Progress</p>
            <h2>Study time this week</h2>
          </div>
          <p className="weekly-total">
            {weeklyData.reduce((sum, day) => sum + day.minutes, 0)} min
          </p>
        </div>

        <div className="weekly-bars">
          {weeklyData.map((day) => (
            <div key={day.label} className="weekly-bar-group">
              <div className="weekly-bar-track">
                <div
                  className="weekly-bar-fill"
                  style={{
                    height: `${(day.minutes / maxMinutes) * 100}%`,
                  }}
                />
              </div>
              <span className="weekly-bar-value">{day.minutes}</span>
              <span className="weekly-bar-label">{day.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
