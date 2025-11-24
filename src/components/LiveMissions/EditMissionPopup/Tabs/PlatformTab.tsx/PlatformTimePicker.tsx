// src/components/Missions/EditMissionTabs/PlatformsTab/PlatformTimePicker.tsx
import React from "react";
import type { Platform } from "../../../../../types/mission";
import GenericMissionDatePicker from "../../../../Common/GenericMissionDatePicker/GenericMissionDatePicker";

interface Props {
  platform: Platform;
  missionStart?: Date;
  missionEnd?: Date;
  updateUsageTime: (field: keyof Platform["usageTime"], value: string) => void;
}

const PlatformTimePicker: React.FC<Props> = ({ platform, missionStart, missionEnd, updateUsageTime }) => {
  const startDate = platform.usageTime.start ? new Date(platform.usageTime.start) : null;
  const endDate = platform.usageTime.end ? new Date(platform.usageTime.end) : null;

  const getMinTime = (selectedDate: Date | null, limitDate: Date | undefined) => {
    if (!selectedDate || !limitDate) return undefined;
    const t = new Date(selectedDate);
    if (selectedDate.toDateString() === limitDate.toDateString()) {
      t.setHours(limitDate.getHours(), limitDate.getMinutes(), 0, 0);
      return t;
    }
    t.setHours(0, 0, 0, 0);
    return t;
  };

  const getMaxTime = (selectedDate: Date | null, limitDate: Date | undefined) => {
    if (!selectedDate || !limitDate) return undefined;
    const t = new Date(selectedDate);
    if (selectedDate.toDateString() === limitDate.toDateString()) {
      t.setHours(limitDate.getHours(), limitDate.getMinutes(), 0, 0);
      return t;
    }
    t.setHours(23, 59, 0, 0);
    return t;
  };

  return (
    <>
      <div className="w-full">
        <GenericMissionDatePicker
          selected={startDate}
          onChange={(date) => date && updateUsageTime("start", date.toISOString())}
          placeholder="Select Start Date"
          className="w-full px-2 py-1 text-sm"
          minDate={missionStart}
          maxDate={missionEnd}
          minTime={getMinTime(startDate, missionStart)}
          maxTime={getMaxTime(startDate, missionEnd)}
          openToDate={startDate ?? missionStart}
        />
      </div>

      <div className="w-full">
        <GenericMissionDatePicker
          selected={endDate}
          onChange={(date) => date && updateUsageTime("end", date.toISOString())}
          placeholder="Select end time"
          className="w-full px-2 py-1 text-sm"
          disabled={!startDate}
          minDate={startDate || missionStart}
          maxDate={missionEnd}
          minTime={getMinTime(endDate, startDate || missionStart)}
          maxTime={getMaxTime(endDate, missionEnd)}
          openToDate={endDate ?? startDate ?? missionStart}
        />
      </div>
    </>
  );
};

export default PlatformTimePicker;
