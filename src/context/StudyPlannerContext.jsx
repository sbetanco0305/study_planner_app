import { useState, useMemo, useEffect } from "react";
import {
  initialAssignments,
  initialSubjects,
  initialCalendarEvents,
} from "../data/initialData";
import { StudyPlannerContext } from "./StudyPlannerContextObject";

const defaultState = {
  subjects: initialSubjects,
  assignments: initialAssignments.map((assignment) => ({
    ...assignment,
    progress: assignment.completed ? 100 : assignment.progress ?? 0,
  })),
  calendarEvents: initialCalendarEvents,
};

export function StudyPlannerProvider({ children }) {
  const [assignments, setAssignments] = useState(defaultState.assignments);
  const [subjects, setSubjects] = useState(defaultState.subjects);
  const [calendarEvents, setCalendarEvents] = useState(defaultState.calendarEvents);

  const [studyStats, setStudyStats] = useState({
    focusSessionsToday: 0,
    studyMinutesToday: 0,
    totalStudyMinutes: 0,
    streakDays: 0,
    weeklyMinutes: [0, 0, 0, 0, 0, 0, 0],
  });

  const [profile, setProfile] = useState({
    username: "Student",
    email: "student@example.com",
    school: "",
    major: "",
    year: "",
    hobbies: "",
  });

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("studyPlannerSettings");

    if (savedSettings) {
      return JSON.parse(savedSettings);
    }

    return {
      darkMode: false,
      emailNotifications: false,
      studyReminders: false,
    };
  });

  useEffect(() => {
    localStorage.setItem("studyPlannerSettings", JSON.stringify(settings));
    document.documentElement.dataset.theme = settings.darkMode ? "dark" : "light";
  }, [settings]);

  function recordFocusSession(minutes) {
    setStudyStats((prev) => {
      const updatedWeeklyMinutes = [...prev.weeklyMinutes];
      updatedWeeklyMinutes[updatedWeeklyMinutes.length - 1] += minutes;
    

      return {
        ...prev,
        focusSessionsToday: prev.focusSessionsToday + 1,
        studyMinutesToday: prev.studyMinutesToday + minutes,
        totalStudyMinutes: prev.totalStudyMinutes + minutes,
        weeklyMinutes: updatedWeeklyMinutes,
      };
    });
  }

  function updateProfile(updates) {
    setProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  }

  function toggleSetting(settingKey) {
    setSettings((prev) => ({
      ...prev,
      [settingKey]: !prev[settingKey],
    }));
  }

  const addCalendarEvent = (event) =>
    setCalendarEvents((prev) => [...prev, event]);

  const deleteCalendarEvent = (id) =>
    setCalendarEvents((prev) => prev.filter((event) => event.id !== id));

  const value = useMemo(() => {
    const enrichedSubjects = subjects.map((subject) => {
      const subjectAssignments = assignments.filter(
        (assignment) => assignment.subjectId === subject.id,
      );

      const completedCount = subjectAssignments.filter(
        (assignment) => assignment.completed,
      ).length;

      const nextAssignment = subjectAssignments
        .filter((assignment) => !assignment.completed)
        .sort((left, right) => left.dueDate.localeCompare(right.dueDate))[0];

      return {
        ...subject,
        assignmentCount: subjectAssignments.length,
        completedCount,
        progress: subjectAssignments.length
          ? Math.round((completedCount / subjectAssignments.length) * 100)
          : 0,
        nextAssignment,
      };
    });

    const upcomingAssignments = [...assignments]
      .filter((assignment) => !assignment.completed)
      .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
      .map((assignment) => ({
        ...assignment,
        subject: enrichedSubjects.find(
          (subject) => subject.id === assignment.subjectId,
        ),
      }));

    const completedAssignments = assignments.filter(
      (assignment) => assignment.completed,
    ).length;

    return {
      subjects: enrichedSubjects,
      assignments,
      upcomingAssignments,
      dashboardStats: {
        activeCourses: enrichedSubjects.length,
        upcomingCount: upcomingAssignments.length,
        completedCount: completedAssignments,
        completionRate: assignments.length
          ? Math.round((completedAssignments / assignments.length) * 100)
          : 0,
      },
      calendarEvents,
      addCalendarEvent,
      deleteCalendarEvent,
      studyStats,
      profile,
      settings,
      recordFocusSession,
      updateProfile,
      toggleSetting,
    };
  }, [subjects, assignments, calendarEvents, studyStats, profile, settings]);

  return (
    <StudyPlannerContext.Provider value={value}>
      {children}
    </StudyPlannerContext.Provider>
  );
}