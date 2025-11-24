// src/components/Missions/GeneralInfo/MissionTimeSection.tsx
import React from "react";
import GenericMissionDatePicker from "../../../../Common/GenericMissionDatePicker/GenericMissionDatePicker";
import type { Mission } from "../../../../../types/mission";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const MissionTimeSection: React.FC<Props> = ({ mission, setMission }) => {
  const now = new Date();

  const startTime = mission.time.start ? new Date(mission.time.start) : null;
  const endTime = mission.time.end ? new Date(mission.time.end) : null;

  // Start time min/max (identical to previous)
  const startMinTime = startTime
    ? new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 0, 0)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
  const startMaxTime = new Date(0, 0, 0, 23, 59);

  // End time min/max (identical to previous)
  const endMinTime =
    startTime && endTime && startTime.toDateString() === endTime.toDateString()
      ? new Date(startTime)
      : new Date(0, 0, 0, 0, 0);
  const endMaxTime = new Date(0, 0, 0, 23, 59);

  return (
    <div className="flex flex-col">
      <label className="text-sm text-[var(--text)]">Mission Time</label>
      <div className="flex gap-3 flex-wrap">
        {/* Start Picker */}
        <div className="w-64">
          <GenericMissionDatePicker
            selected={startTime ?? null}
            onChange={(date) => {
              setMission({
                ...mission,
                time: {
                  start: date ? date.toISOString() : "",
                  end: mission.time.end || "",
                },
              });
            }}
            placeholder="Select start time"
            className="p-3 border-2 border-[var(--accent)] rounded shadow w-full bg-[var(--secondary)]"
            minDate={now}
            minTime={startTime ? now : startMinTime}
            maxTime={startMaxTime}
          />
        </div>

        {/* End Picker */}
        <div className="w-64">
          <GenericMissionDatePicker
            selected={endTime}
            onChange={(date) =>
              setMission({
                ...mission,
                time: { ...mission.time, end: date ? date.toISOString() : "" },
              })
            }
            placeholder="Select end time"
            className="p-3 border-2 border-[var(--accent)] rounded shadow w-full bg-[var(--secondary)]"
            disabled={!startTime}
            minDate={startTime ?? now}
            openToDate={startTime ?? now}
            minTime={startTime ? endMinTime : undefined}
            maxTime={endMaxTime}
          />
        </div>
      </div>
    </div>
  );
};

export default MissionTimeSection;
