import type { Route } from "./route";
import type { Section } from "./section";

export type HoterType = "crawler" | "pandemic";

// Possible Sagahs
export type Sagah =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"; // extend as needed

export interface Hoter {
  id: string;
  name: string;
  type: HoterType;
  section: Section;
  routes: Route[];
  sagahs: Sagah[];
  createdAt: string;
}
