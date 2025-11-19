import type { MissionStatus } from "../types/mission";

export const MISSION_COLUMNS: MissionStatus[] = [
  "planned-missions",
  "active-missions",
  "completed-missions",
];

export const ALLOWED_TRANSITIONS: Record<MissionStatus, MissionStatus[]> = {
  "planned-missions": ["planned-missions", "active-missions"],
  "active-missions": ["planned-missions", "active-missions", "completed-missions"],
  "completed-missions": ["active-missions", "completed-missions"],
};

// Status display labels
export const MISSION_STATUS_LABELS: Record<MissionStatus, string> = {
  "planned-missions": "Planned",
  "active-missions": "Active",
  "completed-missions": "Completed",
};

// Status colors
export const MISSION_STATUS_COLORS: Record<MissionStatus, string> = {
  "planned-missions": "bg-gray-300 text-gray-800",
  "active-missions": "bg-blue-300 text-blue-800",
  "completed-missions": "bg-green-300 text-green-800",
};
