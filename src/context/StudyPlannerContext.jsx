import { useState, useMemo, useEffect } from "react";
import {
  initialAssignments,
  initialSubjects,
  initialCalendarEvents,
} from "../data/initialData";
import { StudyPlannerContext } from "./StudyPlannerContextObject";


function loadFromStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayKey() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

function getDefaultWeeklyMinutes() {
  return [0, 0, 0, 0, 0, 0, 0];
}

const defaultState = {
  subjects: initialSubjects,
  assignments: initialAssignments.map((assignment) => ({
    ...assignment,
    progress: assignment.completed ? 100 : assignment.progress ?? 0,
  })),
  calendarEvents: initialCalendarEvents,
};

export function StudyPlannerProvider({ children }) {
  const [assignments, setAssignments] = useState(() =>
    loadFromStorage("assignments", defaultState.assignments)
  );
  const [subjects, setSubjects] = useState(defaultState.subjects);
  const [calendarEvents, setCalendarEvents] = useState(defaultState.calendarEvents);

  const [studyStats, setStudyStats] = useState(() =>
    loadFromStorage("studyStats", {
      focusSessionsToday: 0,
      studyMinutesToday: 0,
      totalStudyMinutes: 0,
      streakDays: 0,
      weeklyMinutes: [0, 0, 0, 0, 0, 0, 0],
      lastStudyDate: null,
    })
  );

  const [profile, setProfile] = useState(() =>
    loadFromStorage("profile", {
      username: "Student",
      email: "student@example.com",
      school: "",
      major: "",
      year: "",
      hobbies: "",
    })
  );

  const [settings, setSettings] = useState(() =>
    loadFromStorage("settings", {
      darkMode: false,
      emailNotifications: false,
      studyReminders: false,
    })
  );

  function resetApp() {
    localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    window.devTools = { resetApp };
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    document.documentElement.dataset.theme = settings.darkMode ? "dark" : "light";
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("studyStats", JSON.stringify(studyStats));
  }, [studyStats]);

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  function recordFocusSession(minutes) {
    setStudyStats((prev) => {
      const today = getTodayKey();
      const yesterday = getYesterdayKey();
      const isNewDay = prev.lastStudyDate !== today;
    
      let updatedStreak = prev.streakDays;
    
      if (isNewDay) {
        if (prev.lastStudyDate === yesterday) {
          updatedStreak = prev.streakDays + 1;
        } else {
          updatedStreak = 1;
        }
      }
    
      const updatedWeeklyMinutes = [...(prev.weeklyMinutes || getDefaultWeeklyMinutes())];
      const todayIndex = new Date().getDay(); // Sun = 0, Mon = 1...
      const normalizedIndex = todayIndex === 0 ? 6 : todayIndex - 1; // Mon = 0, Sun = 6
    
      updatedWeeklyMinutes[normalizedIndex] += minutes;
    
      return {
        ...prev,
        focusSessionsToday: isNewDay ? 1 : prev.focusSessionsToday + 1,
        studyMinutesToday: isNewDay ? minutes : prev.studyMinutesToday + minutes,
        totalStudyMinutes: prev.totalStudyMinutes + minutes,
        weeklyMinutes: updatedWeeklyMinutes,
        streakDays: updatedStreak,
        lastStudyDate: today,
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
      resetApp,
    };
  }, [subjects, assignments, calendarEvents, studyStats, profile, settings]);

  return (
    <StudyPlannerContext.Provider value={value}>
      {children}
    </StudyPlannerContext.Provider>
  );
}