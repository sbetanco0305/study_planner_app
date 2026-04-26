import { useMemo } from "react";
import { BarChart3, CheckCircle2, Clock3, Target, TrendingUp } from "lucide-react";
import { useStudyPlanner } from "../context/useStudyPlanner";

const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatStudyTime(minutes) {
  if (minutes < 1) {
    return `${Math.round(minutes * 60)} sec`;
  }

  return `${Math.round(minutes)} min`;
}

export default function Statistics() {
  const { studyStats, subjects, assignments, dashboardStats, updateDailyStudyGoal } = useStudyPlanner();

  const completedTasks = assignments.filter((assignment) => assignment.completed).length;

  const weeklyData = useMemo(
    () =>
      WEEK_LABELS.map((label, index) => ({
        label,
        minutes: studyStats.weeklyMinutes?.[index] ?? 0,
      })),
    [studyStats.weeklyMinutes],
  );

  const totalWeeklyMinutes = weeklyData.reduce((sum, day) => sum + day.minutes, 0);

  const dailyGoalMinutes = studyStats.dailyStudyGoalMinutes || 60;

  const dailyGoalProgress = Math.min(
    Math.round((studyStats.studyMinutesToday / dailyGoalMinutes) * 100),
    100
  );

  return (
    <section className="figma-statistics-page">
      <h1 className="figma-statistics-title">Statistics &amp; Progress</h1>

      <div className="figma-stats-grid">
        <StatCard icon={<Clock3 />} value={formatStudyTime(studyStats.totalStudyMinutes)} label="Total Study Time" tone="blue" />
        <StatCard icon={<TrendingUp />} value={`${dashboardStats.completionRate}%`} label="Completion Rate" tone="green" />
        <StatCard icon={<CheckCircle2 />} value={completedTasks} label="Completed Tasks" tone="purple" />
        <StatCard icon={<Target />} value={`${studyStats.streakDays} days`} label="Current Streak" tone="orange" />
      </div>

      <article className="figma-daily-goal-card">
        <div className="figma-daily-goal-header">
          <div>
            <h2>Daily Study Goal</h2>
            <p>
              {formatStudyTime(studyStats.studyMinutesToday)} of{" "}
              {formatStudyTime(dailyGoalMinutes)} completed
            </p>
          </div>

          <strong>{dailyGoalProgress}%</strong>
        </div>

        <div className="figma-daily-goal-editor">
          <label>
            Goal:
            <input
              type="number"
              min="1"
              value={dailyGoalMinutes}
              onChange={(event) =>
                updateDailyStudyGoal(Number(event.target.value))
              }
            />
            min/day
          </label>
        </div>

        <div className="figma-daily-goal-track">
          <div
            className="figma-daily-goal-fill"
            style={{ width: `${dailyGoalProgress}%` }}
          />
        </div>
      </article>

      <article className="figma-chart-card">
        <h2>Weekly Study Time</h2>

        <div className="figma-weekly-chart">
          {weeklyData.map((day) => (
            <div key={day.label} className="figma-weekly-column">
              <div className="figma-weekly-bar-area">
                <div
                  className="figma-weekly-bar"
                  style={{ height: `${Math.max(day.minutes * 6, day.minutes > 0 ? 12 : 0)}px` }}
                />
              </div>
              <strong>{day.label}</strong>
              <span>{formatStudyTime(day.minutes)}</span>
            </div>
          ))}
        </div>

        <p className="figma-weekly-total">
          Total this week: <strong>{formatStudyTime(totalWeeklyMinutes)}</strong>
        </p>
      </article>

      <article className="figma-progress-card">
        <h2>Progress by Subject</h2>

        <div className="figma-subject-progress-list">
          {subjects.map((subject) => {
            const total = subject.assignmentCount || 0;
            const completed = subject.completedCount || 0;
            const progress = total ? Math.round((completed / total) * 100) : 0;

            return (
              <div key={subject.id} className="figma-subject-progress-item">
                <div className="figma-subject-progress-top">
                  <h3>{subject.name}</h3>
                  <span>
                    {completed}/{total} assignments
                  </span>
                </div>

                <div className="figma-subject-progress-track">
                  <div
                    className="figma-subject-progress-fill"
                    style={{
                      width: `${progress}%`,
                      background: subject.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
}

function StatCard({ icon, value, label, tone }) {
  return (
    <article className="figma-stat-card">
      <div className={`figma-stat-icon ${tone}`}>{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
