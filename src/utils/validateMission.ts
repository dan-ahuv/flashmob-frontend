import type { Mission, Technician, Matzat, Mamash } from "../types/mission";

export function validateMissionStep(
  step: number,
  formData: Partial<Mission>
): string | null {
  switch (step) {
    // STEP 1 — Basic info
    case 0:
      if (!formData.name || formData.name.trim() === "") {
        return "Please enter a mission name";
      }
      if (!formData.section) {
        return "Please select a section";
      }
      if (!formData.time?.start || !formData.time?.end) {
        return "Start and end time are required";
      }

      const startTime = new Date(formData.time.start);
      const endTime = new Date(formData.time.end);
      const now = new Date();
      const diffHours =
        (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      if (startTime < now) return "Start time cannot be in the past";
      if (endTime <= startTime) return "End time must be after start time";
      if (diffHours > 24) return "Mission cannot be longer than 24 hours";
      break;

    // STEP 2 — Platforms
    case 1:
      if (!formData.platforms || formData.platforms.length === 0) {
        return "Please add at least one platform";
      }

      const missionStart = new Date(formData.time!.start);
      const missionEnd = new Date(formData.time!.end);

      for (const platform of formData.platforms) {
        if (!platform.usageTime?.start || !platform.usageTime?.end) {
          return `Platform "${platform.number}" must have start and end time`;
        }

        const platformStart = new Date(platform.usageTime.start);
        const platformEnd = new Date(platform.usageTime.end);

        if (platformEnd <= platformStart) {
          return `Platform "${platform.number}" end time must be after start time`;
        }

        if (platformStart < missionStart || platformEnd > missionEnd) {
          return `Platform "${platform.number}" time must be within mission duration`;
        }
      }
      break;

    // STEP 3 — Crew
    case 2:
      const mStart = new Date(formData.time!.start);
      const mEnd = new Date(formData.time!.end);

      const validateMembers = <T extends Technician | Matzat | Mamash>(
        members: T[] | undefined,
        type: string
      ): string | null => {
        for (const member of members || []) {
          // Type-safe checks
          if (!member.name || member.name.trim() === "") {
            return `${type} member must have a name`;
          }
          if (!member.assignedTime?.start || !member.assignedTime?.end) {
            return `${type} "${member.name}" must have start and end time`;
          }

          const start = new Date(member.assignedTime.start);
          const end = new Date(member.assignedTime.end);

          if (end <= start) {
            return `${type} "${member.name}" end time must be after start time`;
          }

          if (start < mStart || end > mEnd) {
            return `${type} "${member.name}" time must be within mission duration`;
          }
        }
        return null;
      };

      return (
        validateMembers(formData.technicians, "Technician") ||
        validateMembers(formData.matzats, "Matzat") ||
        validateMembers(formData.mamashs, "Mamash")
      );

    // STEP 4 — optional
  }

  return null; // valid
}
