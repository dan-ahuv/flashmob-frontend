import React from "react";
import { STATIONS, type Station } from "../../../../../types/station";
import type { Mission } from "../../../../../types/mission";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const StationSelector: React.FC<Props> = ({ mission, setMission }) => {
  const isPlanned = mission.status === "planned-missions";

  return (
    <div className="flex-1 flex flex-col">
    <label className="text-sm text-[var(--text)]">Station</label>
    <select
        value={mission.station || ""}
        onChange={(e) => {
        setMission({
            ...mission,
            station: (e.target.value || undefined) as Station | undefined,
        });
        }}
        className="px-2 py-1 h-12 border-2 border-[var(--accent)] rounded shadow bg-[var(--secondary)]"
    >
        {isPlanned && <option value="">None</option>}
        {STATIONS.map((s) => (
        <option key={s} value={s} disabled={mission.backupStation === s}>
            Station {s}
        </option>
        ))}
    </select>
    </div>
  );
};

export default StationSelector;
