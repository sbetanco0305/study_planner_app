export const STORAGE_KEY = "study-planner-state-v2";

export function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
