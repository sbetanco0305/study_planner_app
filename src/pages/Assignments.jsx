import { useMemo, useState } from "react";
import { initialAssignments, initialSubjects } from "../data/initialData";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

function getSubjectMap() {
  return Object.fromEntries(initialSubjects.map((subject) => [subject.id, subject]));
}

function AssignmentCard({ assignment, subject, completed = false }) {
  return (
    <div className={`figma-assignment-card ${completed ? "completed-card" : ""}`}>
      <div className="figma-assignment-top">
        <div>
          <p
            className="figma-subject-label"
            style={{ color: subject?.color || "#64748b" }}
          >
            {subject?.name || "Subject"}
          </p>
          <h3 className="figma-assignment-title">{assignment.title}</h3>
        </div>

        {completed ? (
          <span className="figma-status-badge completed">Completed</span>
        ) : (
          <span className="figma-status-badge progress">In Progress</span>
        )}
      </div>

      <p className="figma-due-date">Due: {formatDate(assignment.dueDate)}</p>

      {!completed && (
        <>
          <div className="figma-progress-row">
            <span className="figma-progress-label">Progress</span>
            <span className="figma-progress-percent">{assignment.progress}%</span>
          </div>

          <div className="figma-progress-track">
            <div
              className="figma-progress-fill"
              style={{
                width: `${assignment.progress}%`,
                backgroundColor: subject?.color || "#6366f1",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function Assignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subjectId: initialSubjects[0]?.id || "",
    dueDate: "",
    progress: 0,
  });

  const subjectMap = useMemo(() => getSubjectMap(), []);

  const inProgress = assignments
    .filter((assignment) => !assignment.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const completed = assignments
    .filter((assignment) => assignment.completed)
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim() || !formData.dueDate || !formData.subjectId) {
      alert("Please fill in the title, subject, and due date.");
      return;
    }

    const newAssignment = {
      id: `assignment-${Date.now()}`,
      subjectId: formData.subjectId,
      title: formData.title.trim(),
      dueDate: formData.dueDate,
      completed: Number(formData.progress) >= 100,
      progress: Number(formData.progress),
    };

    setAssignments((prev) => [newAssignment, ...prev]);
    setFormData({
      title: "",
      subjectId: initialSubjects[0]?.id || "",
      dueDate: "",
      progress: 0,
    });
    setShowModal(false);
  }

  return (
    <div className="figma-assignments-page">
      <div className="figma-page-header">
        <div>
          <h1 className="figma-page-title">Assignments</h1>
          <p className="figma-page-subtitle">
            Track your current work and completed tasks in one place.
          </p>
        </div>

        <button className="figma-add-btn" type="button" onClick={() => setShowModal(true)}>
          + Add Assignment
        </button>
      </div>

      <section className="figma-section-block">
        <div className="figma-section-header">
          <h2>Upcoming & In Progress</h2>
          <span>{inProgress.length} tasks</span>
        </div>

        <div className="figma-assignments-grid">
          {inProgress.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              subject={subjectMap[assignment.subjectId]}
            />
          ))}
        </div>
      </section>

      <section className="figma-section-block">
        <div className="figma-section-header">
          <h2>Completed</h2>
          <span>{completed.length} tasks</span>
        </div>

        <div className="figma-assignments-grid">
          {completed.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              subject={subjectMap[assignment.subjectId]}
              completed
            />
          ))}
        </div>
      </section>

      {showModal && (
        <div className="figma-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="figma-modal" onClick={(e) => e.stopPropagation()}>
            <div className="figma-modal-header">
              <h2>Add Assignment</h2>
              <button
                type="button"
                className="figma-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form className="figma-form" onSubmit={handleSubmit}>
              <label>
                Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter assignment title"
                />
              </label>

              <label>
                Subject
                <select
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleChange}
                >
                  {initialSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Due Date
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </label>

              <label>
                Progress (%)
                <input
                  type="number"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                />
              </label>

              <div className="figma-form-actions">
                <button
                  type="button"
                  className="figma-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="figma-save-btn">
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}