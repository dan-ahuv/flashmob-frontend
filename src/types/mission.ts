import type { Route } from "./route";
import type { RT } from "./rt";
import type { Section } from "./section";
import type { Station } from "./station";

export type MissionStatus = "planned-missions" | "active-missions" | "completed-missions";

export interface TimeRange {
  start: string; // ISO date string
  end: string;   // ISO date string
}

export interface Platform {
  number: number;                // platform number
  rt: RT;                    // RT
  backupRt: RT;              // backup RT
  uplink: number;                // uplink
  downlink: number;              // downlink
  status: "connected" | "disconnected" | "finished";
  usageTime: TimeRange;          // start & end time of usage
}

export interface Technician {
  name: string;
  assignedTime: TimeRange;       // start & end time
}

export interface Matzat {
  name: string;
  assignedTime: TimeRange;       // start & end time
}

export interface Mamash {
  name: string;
  assignedTime: TimeRange;       // start & end time
}

export interface Mission {
  id: string;                    // unique mission id
  name: string;                  // mission name
  platforms: Platform[];         // one or more platforms
  station?: Station;               // main station
  backupStation?: Station;        // optional backup station
  route: Route;                 // route identifier/name
  section: Section;               // section identifier/name
  technicians: Technician[];     // assigned technicians
  matzats: Matzat[];             // assigned matzats
  mamashs: Mamash[];             // assigned mamashs
  time: TimeRange;               // mission time range
  status: MissionStatus;         // for Kanban
}
