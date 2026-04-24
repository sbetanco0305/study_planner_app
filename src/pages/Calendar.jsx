import { useState } from "react";
import { useStudyPlanner } from "../context/useStudyPlanner";
import { getMonthGrid, formatMonthYear, formatShortDate, formatTimeRange } from "../utils/planner";
import { createId } from "../utils/storage";

export default function Calendar() {
  const { calendarEvents, assignments, subjects, addCalendarEvent, deleteCalendarEvent } = useStudyPlanner();
  const [viewDate, setViewDate] = useState(new Date("2026-03-01T12:00:00"));
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    subjectId: subjects[0]?.id || "",
  });

  const monthGrid = getMonthGrid(viewDate);
  const incompleteAssignments = assignments.filter((a) => !a.completed);

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const upcomingEvents = [...calendarEvents]
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: createId("event"),
      ...formData,
    };
    addCalendarEvent(newEvent);
    setShowModal(false);
    setFormData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      subjectId: subjects[0]?.id || "",
    });
  };

  return (
    <section className="page-section dashboard-page">
      <div className="figma-page-header">
        <div>
          <h1 className="figma-page-title">Calendar</h1>
          <p className="figma-page-subtitle">Manage your schedule and upcoming deadlines</p>
        </div>
        <button className="figma-add-btn" onClick={() => setShowModal(true)}>
          + Add Event
        </button>
      </div>

      <div className="dashboard-layout">
        {/* Main Calendar Grid Area */}
        <div className="app-card" style={{ padding: "30px", minWidth: 0 }}>
          <div className="section-subhead" style={{ marginBottom: "24px" }}>
            <button onClick={handlePrevMonth} className="figma-cancel-btn">&larr; Prev</button>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>{formatMonthYear(viewDate)}</h2>
            <button onClick={handleNextMonth} className="figma-cancel-btn">Next &rarr;</button>
          </div>

          {/* Days of the Week Header */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "12px", textAlign: "center", fontWeight: "800", color: "#64748b", marginBottom: "12px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          
          {/* Calendar Day Cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "12px" }}>
            {monthGrid.map((day) => {
              const dateStr = day.date.toISOString().split("T")[0];
              const dayEvents = calendarEvents.filter((e) => e.date === dateStr);
              const dayAssignments = incompleteAssignments.filter((a) => a.dueDate === dateStr);

              return (
                <div key={day.key} style={{ 
                  height: "140px", // Fixed height so the grid stays perfect
                  padding: "10px", 
                  border: "2px solid #e2e8f0", 
                  borderRadius: "12px", 
                  background: day.inMonth ? "#ffffff" : "#f8fafc", 
                  opacity: day.inMonth ? 1 : 0.6, 
                  display: "flex", 
                  flexDirection: "column",
                  overflow: "hidden" 
                }}>
                  <div style={{ fontWeight: "800", fontSize: "0.95rem", color: day.inMonth ? "#0f172a" : "#94a3b8", marginBottom: "8px" }}>
                    {day.date.getDate()}
                  </div>
                  
                  {/* Scrollable container for events */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto", flex: 1, paddingRight: "4px" }}>
                    
                    {/* Events */}
                    {dayEvents.map((event) => {
                      const subject = subjects.find((s) => s.id === event.subjectId);
                      return (
                        <div key={event.id} style={{ fontSize: "0.7rem", padding: "6px 8px", borderRadius: "6px", background: subject ? `${subject.color}15` : "#f1f5f9", color: subject ? subject.color : "#334155", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: subject ? subject.color : "#cbd5e1", flexShrink: 0 }} />
                          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1, minWidth: 0 }}>
                            {event.title}
                          </span>
                        </div>
                      );
                    })}

                    {/* Assignments */}
                    {dayAssignments.map((assignment) => {
                      const subject = subjects.find((s) => s.id === assignment.subjectId);
                      return (
                        <div key={assignment.id} style={{ fontSize: "0.7rem", padding: "6px 8px", borderRadius: "6px", background: "#fee2e2", color: "#ef4444", fontWeight: "700", display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: subject ? subject.color : "#cbd5e1", flexShrink: 0 }} />
                            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1, minWidth: 0 }}>
                              Due: {assignment.title}
                            </span>
                          </div>
                          <div style={{ width: "100%", height: "4px", backgroundColor: "#fca5a5", borderRadius: "2px", overflow: "hidden" }}>
                            <div style={{ width: `${assignment.progress}%`, height: "100%", backgroundColor: "#ef4444", borderRadius: "2px" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="stack-section dashboard-sidebar">
          <article className="app-card sidebar-card" style={{ border: "2px solid #e2e8f0", borderRadius: "20px", padding: "24px", background: "#f8fafc" }}>
            <div className="section-subhead" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a" }}>Upcoming Events</h2>
            </div>
            <div className="mini-task-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => {
                  const subject = subjects.find((s) => s.id === event.subjectId);
                  return (
                    <div className="mini-task-row" key={event.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: "#ffffff", padding: "16px", borderRadius: "12px", border: "2px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: "12px", minWidth: 0 }}>
                        <span aria-hidden="true" className="subject-dot" style={{ backgroundColor: subject?.color || "#cbd5e1", width: "12px", height: "12px", marginTop: "4px", flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                          <strong style={{ fontSize: "0.95rem", color: "#1e293b", display: "block", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {event.title}
                          </strong>
                          <span style={{ display: "block", color: "#64748b", fontSize: "0.8rem", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {formatShortDate(event.date)} • {formatTimeRange(event.startTime, event.endTime)}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteCalendarEvent(event.id)}
                        style={{ background: '#fee2e2', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", flexShrink: 0 }}
                        aria-label="Delete event"
                      >
                        &times;
                      </button>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "600", textAlign: "center", padding: "20px 0" }}>No upcoming events scheduled.</p>
              )}
            </div>
          </article>
        </aside>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="figma-modal-overlay">
          <div className="figma-modal" style={{ border: "2px solid #e2e8f0", borderRadius: "20px", padding: "24px" }}>
            <div className="figma-modal-header" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontWeight: "800", fontSize: "1.3rem" }}>Add New Event</h2>
              <button className="figma-close-btn" onClick={() => setShowModal(false)} style={{ fontSize: "1.8rem" }}>
                &times;
              </button>
            </div>

            <form className="figma-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.95rem" }}>
                Event Title
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter new event"
                  style={{ border: "2px solid #e2e8f0", borderRadius: "10px", padding: "10px 14px", fontWeight: "600", fontSize: "0.95rem" }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.95rem" }}>
                Subject
                <select
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleChange}
                  style={{ border: "2px solid #e2e8f0", borderRadius: "10px", padding: "10px 14px", fontWeight: "600", fontSize: "0.95rem" }}
                >
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.95rem" }}>
                Date
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  style={{ border: "2px solid #e2e8f0", borderRadius: "10px", padding: "10px 14px", fontWeight: "600", fontSize: "0.95rem" }}
                />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.95rem" }}>
                  Start Time
                  <input
                    type="time"
                    name="startTime"
                    required
                    value={formData.startTime}
                    onChange={handleChange}
                    style={{ border: "2px solid #e2e8f0", borderRadius: "10px", padding: "10px 14px", fontWeight: "600", fontSize: "0.95rem" }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.95rem" }}>
                  End Time
                  <input
                    type="time"
                    name="endTime"
                    required
                    value={formData.endTime}
                    onChange={handleChange}
                    style={{ border: "2px solid #e2e8f0", borderRadius: "10px", padding: "10px 14px", fontWeight: "600", fontSize: "0.95rem" }}
                  />
                </label>
              </div>

              <div className="figma-form-actions" style={{ marginTop: "24px", gap: "12px" }}>
                <button
                  type="button"
                  className="figma-cancel-btn"
                  onClick={() => setShowModal(false)}
                  style={{ borderRadius: "10px", fontWeight: "800", padding: "12px 20px", fontSize: "0.95rem" }}
                >
                  Cancel
                </button>
                <button type="submit" className="figma-save-btn" style={{ borderRadius: "10px", fontWeight: "800", padding: "12px 20px", fontSize: "0.95rem" }}>
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}