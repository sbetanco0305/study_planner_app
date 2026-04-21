import { AssignmentIcon, BookIcon, CalendarIcon, TrendUpIcon } from "../components/Icons";
import { useStudyPlanner } from "../context/useStudyPlanner";
import { formatLongDate, formatShortDate } from "../utils/planner";

const statCards = [
  { key: "activeCourses", label: "Active Courses", icon: BookIcon, tone: "blue" },
  { key: "upcomingCount", label: "Open Tasks", icon: AssignmentIcon, tone: "purple" },
  { key: "completedCount", label: "Completed", icon: CalendarIcon, tone: "green" },
  { key: "completionRate", label: "Completion Rate", icon: TrendUpIcon, tone: "orange", suffix: "%" },
];

export default function Home() {
  const { dashboardStats, subjects, upcomingAssignments } = useStudyPlanner();

  return (
    <section className="page-section dashboard-page">
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Study Planner Overview</h1>
          <p className="hero-copy">
            
          </p>
        </div>

        <div className="hero-date-card app-card">
          <span>Design Reference</span>
          <strong>{formatLongDate("2026-03-25")}</strong>
          
        </div>
      </div>

      <div className="stat-grid">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = dashboardStats[card.key];

          return (
            <article className={`app-card metric-card tone-${card.tone}`} key={card.key}>
              <div className="metric-card-top">
                <span>{card.label}</span>
                <Icon className="muted-icon" size={24} />
              </div>
              <strong>
                {value}
                {card.suffix ?? ""}
              </strong>
            </article>
          );
        })}
      </div>

      <div className="dashboard-layout">
        <section className="stack-section">
          <div className="section-subhead">
            <h2>Upcoming Tasks</h2>
            <span className="section-caption"></span>
          </div>

          <div className="card-grid two-up">
            {upcomingAssignments.slice(0, 4).map((assignment) => (
              <article className="app-card task-card" key={assignment.id}>
                <div className="card-header-row">
                  <div className="subject-caption">
                    <span
                      aria-hidden="true"
                      className="subject-dot"
                      style={{ backgroundColor: assignment.subject?.color }}
                    />
                    <span>{assignment.subject?.name}</span>
                  </div>
                  <span className="task-progress">{assignment.progress}%</span>
                </div>

                <h3>{assignment.title}</h3>

                <div className="assignment-date-row">
                  <CalendarIcon className="muted-icon" size={20} />
                  <span>{formatLongDate(assignment.dueDate)}</span>
                </div>

                <div className="progress-meta">
                  <span>Progress</span>
                  <span>{assignment.progress}%</span>
                </div>

                <div className="progress-bar">
                  <span
                    className="progress-value"
                    style={{
                      backgroundColor: assignment.subject?.color,
                      width: `${assignment.progress}%`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="section-subhead">
            <h2>Subject Overview</h2>
            <span className="section-caption">Homepage progress cards</span>
          </div>

          <div className="card-grid two-up">
            {subjects.map((subject) => (
              <article className="app-card subject-overview-card" key={subject.id}>
                <div className="card-header-row">
                  <div className="title-with-dot">
                    <span
                      aria-hidden="true"
                      className="subject-dot"
                      style={{ backgroundColor: subject.color }}
                    />
                    <h3>{subject.name}</h3>
                  </div>
                  <BookIcon className="muted-icon" size={24} />
                </div>

                <div className="progress-meta">
                  <span>Completed</span>
                  <span>
                    {subject.completedCount} / {subject.assignmentCount}
                  </span>
                </div>

                <div className="progress-bar">
                  <span
                    className="progress-value"
                    style={{ backgroundColor: subject.color, width: `${subject.progress}%` }}
                  />
                </div>

                <div className="subject-footer">
                  <span className="inline-note">
                    Next due {formatShortDate(subject.nextAssignment?.dueDate ?? "2026-03-31")}
                  </span>
                  <span className="subject-progress-label">{subject.progress}% done</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="stack-section dashboard-sidebar">
          
           
          

          <article className="app-card sidebar-card">
            <div className="section-subhead">
              <h2>Next Deadlines</h2>
            </div>
            <div className="mini-task-list">
              {upcomingAssignments.slice(0, 5).map((assignment) => (
                <div className="mini-task-row" key={assignment.id}>
                  <span
                    aria-hidden="true"
                    className="subject-dot"
                    style={{ backgroundColor: assignment.subject?.color }}
                  />
                  <div>
                    <strong>{assignment.title}</strong>
                    <span>{formatShortDate(assignment.dueDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
