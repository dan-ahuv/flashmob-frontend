// utils/validateMission.ts
import type { Mission, Platform, Technician, Matzat, Mamash } from "../types/mission";

/**
 * Result: list of human-friendly error messages.
 * Assumptions:
 *  - mission.time.start / end and platform/technician times are ISO strings parseable by `new Date(...)`.
 *  - Times are treated as local (as you specified).
 */
export function validateEditMission(mission: Mission): string[] {
  const errors: string[] = [];

  const now = new Date();

  const parse = (iso?: string) => (iso ? new Date(iso) : null);

  const missionStart = parse(mission.time?.start);
  const missionEnd = parse(mission.time?.end);

  // Helper: check start < end (strict)
  const isStrictlyBefore = (a: Date | null, b: Date | null) => {
    if (!a || !b) return false;
    return a.getTime() < b.getTime();
  };

  // Helper: inside mission range (allow equals? we require start >= mission.start and end <= mission.end;
  // since we disallow equality between start and end we still allow platform times to equal mission bounds).
  const isWithinMission = (start: Date | null, end: Date | null) => {
    if (!missionStart || !missionEnd || !start || !end) return false;
    return start.getTime() >= missionStart.getTime() && end.getTime() <= missionEnd.getTime() && start.getTime() < end.getTime();
  };

  // Completed missions: editing forbidden
  if (mission.status === "completed-missions") {
    errors.push("Editing is forbidden for completed missions.");
    return errors;
  }

  // Common validations for planned & active
  // 1. mission name
  if (!mission.name || mission.name.trim() === "") {
    errors.push("Mission must have a name.");
  }

  // 2. section must be chosen
  if (!mission.section) {
    errors.push("Section must be chosen.");
  }

  // 3. mission start and end present
  if (!mission.time || !mission.time.start || !mission.time.end) {
    errors.push("Mission start and end time must be chosen.");
  } else {
    if (!missionStart || isNaN(missionStart.getTime())) {
      errors.push("Mission start time is invalid.");
    }
    if (!missionEnd || isNaN(missionEnd.getTime())) {
      errors.push("Mission end time is invalid.");
    }

    if (missionStart && missionEnd) {
      // 4. start < end (strict)
      if (!(missionStart.getTime() < missionEnd.getTime())) {
        errors.push("Mission start time must be strictly before mission end time.");
      }

      // 5. mission cannot be longer than 24 hours
      const durationMs = missionEnd.getTime() - missionStart.getTime();
      const maxMs = 24 * 60 * 60 * 1000;
      if (durationMs > maxMs) {
        errors.push("Mission cannot be longer than 24 hours.");
      }

      // 6. mission cannot be in the past: mission start must be > current time (strictly)
      if (!(missionStart.getTime() > now.getTime())) {
        errors.push("Mission start time must be in the future.");
      }
    }
  }

  // 7. need at least one platform
  if (!Array.isArray(mission.platforms) || mission.platforms.length === 0) {
    errors.push("At least one platform is required.");
  } else {
    mission.platforms.forEach((p: Platform, idx: number) => {
      const base = `Platform #${p.number ?? idx + 1}`;

      // platform must have start & end
      if (!p.usageTime || !p.usageTime.start || !p.usageTime.end) {
        errors.push(`${base}: start and end time must be chosen.`);
      } else {
        const pStart = parse(p.usageTime.start);
        const pEnd = parse(p.usageTime.end);
        if (!pStart || isNaN(pStart.getTime())) {
          errors.push(`${base}: start time is invalid.`);
        }
        if (!pEnd || isNaN(pEnd.getTime())) {
          errors.push(`${base}: end time is invalid.`);
        }
        if (pStart && pEnd && !(pStart.getTime() < pEnd.getTime())) {
          errors.push(`${base}: start time must be strictly before end time.`);
        }

        // platform time must be between mission time
        if (!isWithinMission(pStart, pEnd)) {
          errors.push(`${base}: platform time must be within the mission time range.`);
        }
      }

      // For active missions (checked below) we'll require additional fields (rt, uplink, downlink, status, number).
    });
  }

  // Technicians / Matzats / Mamashs: optional, but if present must have name and time within mission
  const validateTeamMemberList = (list: (Technician | Matzat | Mamash)[], kind: string) => {
    list.forEach((m, idx) => {
      const label = `${kind} #${idx + 1}`;
      if (!m.name || m.name.trim() === "") {
        errors.push(`${label}: name is required.`);
      }
      if (!m.assignedTime || !m.assignedTime.start || !m.assignedTime.end) {
        errors.push(`${label}: assigned start and end time must be chosen.`);
      } else {
        const aStart = parse(m.assignedTime.start);
        const aEnd = parse(m.assignedTime.end);
        if (!aStart || isNaN(aStart.getTime())) {
          errors.push(`${label}: assigned start time is invalid.`);
        }
        if (!aEnd || isNaN(aEnd.getTime())) {
          errors.push(`${label}: assigned end time is invalid.`);
        }
        if (aStart && aEnd && !(aStart.getTime() < aEnd.getTime())) {
          errors.push(`${label}: assigned start time must be strictly before assigned end time.`);
        }
        // must be inside mission
        if (!isWithinMission(aStart, aEnd)) {
          errors.push(`${label}: assigned time must be within the mission time range.`);
        }
      }
    });
  };

  validateTeamMemberList(mission.technicians ?? [], "Technician");
  validateTeamMemberList(mission.matzats ?? [], "Matzat");
  validateTeamMemberList(mission.mamashs ?? [], "Mamash");

  // Additional checks for active missions
  if (mission.status === "active-missions") {
    // station & route must be chosen
    if (!mission.station) {
      errors.push("Station must be chosen for active missions.");
    }
    if (!mission.route) {
      errors.push("Route must be chosen for active missions.");
    }

    // must have at least one technician, matzat, mamash
    if (!Array.isArray(mission.technicians) || mission.technicians.length === 0) {
      errors.push("At least one technician is required for active missions.");
    }
    if (!Array.isArray(mission.matzats) || mission.matzats.length === 0) {
      errors.push("At least one matzat is required for active missions.");
    }
    if (!Array.isArray(mission.mamashs) || mission.mamashs.length === 0) {
      errors.push("At least one mamash is required for active missions.");
    }

    // each platform must have RT, uplink, downlink, status and number
    mission.platforms?.forEach((p: Platform, idx: number) => {
      const base = `Platform #${p.number ?? idx + 1}`;
      if (!p.rt) errors.push(`${base}: RT must be set for active missions.`);
      if (p.uplink === undefined || p.uplink === null) errors.push(`${base}: uplink must be set for active missions.`);
      if (p.downlink === undefined || p.downlink === null) errors.push(`${base}: downlink must be set for active missions.`);
      if (!p.status) errors.push(`${base}: status must be set for active missions.`);
      if (p.number === undefined || p.number === null) errors.push(`${base}: number must be set for active missions.`);
    });
  }

  return errors;
}
