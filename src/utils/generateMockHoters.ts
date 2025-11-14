import type { Hoter, HoterRoute, Section, Sagah, HoterType } from "../types/hoter";

// Lists for random generation
const hoterTypes: HoterType[] = ["crawler", "pandemic"];
const sections: Section[] = ["110","130","140","150","160","161","170","180","190"];
const hoterRoutes: HoterRoute[] = [
  "dirty-dance-a",
  "dirty-dance-b",
  "dirty-dance-c",
  "dirty-dance-d",
  "dirty-dance-targil",
  "electric-eye-a",
  "electric-eye-test"
];
const sagahs: Sagah[] = ["A", "B", "C", "D", "E"];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick N random items from array
function pickRandom<T>(array: T[], minItems: number, maxItems: number): T[] {
  const count = getRandomInt(minItems, maxItems);
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate mock Hoters
export function generateMockHoters(count = 100): Hoter[] {
  return Array.from({ length: count }).map((_, idx) => ({
    id: `${idx + 1}`,
    name: `Hoter ${idx + 1}`,
    type: hoterTypes[Math.floor(Math.random() * hoterTypes.length)],
    section: sections[Math.floor(Math.random() * sections.length)],
    routes: pickRandom(hoterRoutes, 1, 3), // <-- multiple routes
    sagahs: pickRandom(sagahs, 1, 3), // multiple sagahs
    createdAt: new Date().toISOString(),
  }));
}
