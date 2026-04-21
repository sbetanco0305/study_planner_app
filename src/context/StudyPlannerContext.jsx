import { useMemo } from "react";
import { initialAssignments, initialSubjects } from "../data/initialData";
import { StudyPlannerContext } from "./StudyPlannerContextObject";

const defaultState = {
  subjects: initialSubjects,
  assignments: initialAssignments.map((assignment) => ({
    ...assignment,
    progress: assignment.completed ? 100 : assignment.progress ?? 0,
  })),
};

export function StudyPlannerProvider({ children }) {
  const value = useMemo(() => {
    const subjects = defaultState.subjects.map((subject) => {
      const subjectAssignments = defaultState.assignments.filter(
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

    const upcomingAssignments = [...defaultState.assignments]
      .filter((assignment) => !assignment.completed)
      .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
      .map((assignment) => ({
        ...assignment,
        subject: subjects.find((subject) => subject.id === assignment.subjectId),
      }));

    const completedAssignments = defaultState.assignments.filter(
      (assignment) => assignment.completed,
    ).length;

    return {
      subjects,
      upcomingAssignments,
      dashboardStats: {
        activeCourses: subjects.length,
        upcomingCount: upcomingAssignments.length,
        completedCount: completedAssignments,
        completionRate: defaultState.assignments.length
          ? Math.round((completedAssignments / defaultState.assignments.length) * 100)
          : 0,
      },
    };
  }, []);

  return (
    <StudyPlannerContext.Provider value={value}>
      {children}
    </StudyPlannerContext.Provider>
  );
}
