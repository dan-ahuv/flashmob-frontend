import React from "react";
import type { TimeRange } from "../../../../../types/mission";
import GenericMissionDatePicker from "../../../../Common/GenericMissionDatePicker/GenericMissionDatePicker";

interface Props {
  assignedTime: TimeRange;
  missionStart?: Date;
  missionEnd?: Date;
  onChange: (updated: TimeRange) => void;
}

const MemberTimePicker: React.FC<Props> = ({ assignedTime, missionStart, missionEnd, onChange }) => {
  const startDate = assignedTime.start ? new Date(assignedTime.start) : null;
  const endDate = assignedTime.end ? new Date(assignedTime.end) : null;

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
      {/* START TIME */}
      <div className="flex flex-col w-full">
        <label className="text-xs mb-1">Start Time</label>
        <GenericMissionDatePicker
          selected={startDate}
          onChange={(date) =>
            onChange({ ...assignedTime, start: date ? date.toISOString() : "" })
          }
          placeholder="Select Start Time"
          className="w-full p-1 rounded text-sm"
          minDate={missionStart}
          maxDate={missionEnd}
          minTime={getMinTime(startDate, missionStart)}
          maxTime={getMaxTime(startDate, missionEnd)}
          openToDate={startDate ?? missionStart ?? undefined}
        />
      </div>

      {/* END TIME */}
      <div className="flex flex-col w-full">
        <label className="text-xs mb-1">End Time</label>
        <GenericMissionDatePicker
          selected={endDate}
          onChange={(date) =>
            onChange({ ...assignedTime, end: date ? date.toISOString() : "" })
          }
          placeholder="Select End Time"
          className="w-full p-1 rounded text-sm"
          disabled={!startDate}
          minDate={startDate || missionStart}
          maxDate={missionEnd}
          minTime={getMinTime(endDate, startDate || missionStart)}
          maxTime={getMaxTime(endDate, missionEnd)}
          openToDate={endDate ?? startDate ?? missionStart ?? undefined}
        />
      </div>
    </>
  );
};

export default MemberTimePicker;
