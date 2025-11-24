// src/components/Missions/EditMissionTabs/GeneralInfoTab/BackupStationSelector.tsx
import React from "react";
import type { Mission } from "../../../../../types/mission";
import { STATIONS } from "../../../../../types/station";
import type { Station } from "../../../../../types/station";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const BackupStationSelector: React.FC<Props> = ({ mission, setMission }) => {
  const isPlanned = mission.status === "planned-missions";

  return (
    <div className="flex flex-col">
      <label className="text-sm text-[var(--text)]">Backup Station</label>
      <select
        value={mission.backupStation || ""}
        onChange={(e) =>
          setMission({
            ...mission,
            backupStation: (e.target.value || undefined) as Station | undefined,
          })
        }
        className="w-full px-2 py-1 h-12 border-2 border-[var(--accent)] rounded shadow bg-[var(--secondary)]"
      >
        {isPlanned && <option value="">None</option>}
        {STATIONS.map((s) => (
          <option key={s} value={s} disabled={mission.station === s}>
            Station {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BackupStationSelector;
