import { useContext } from "react";
import { StudyPlannerContext } from "./StudyPlannerContextObject";

export function useStudyPlanner() {
  const context = useContext(StudyPlannerContext);

  if (!context) {
    throw new Error("useStudyPlanner must be used within a StudyPlannerProvider.");
  }

  return context;
}
