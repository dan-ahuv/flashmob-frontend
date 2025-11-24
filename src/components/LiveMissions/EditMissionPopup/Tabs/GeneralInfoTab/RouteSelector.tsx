import React from "react";
import { ROUTES } from "../../../../../types/route";
import type { Mission } from "../../../../../types/mission";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const RouteSelector: React.FC<Props> = ({ mission, setMission }) => {
  const isPlanned = mission.status === "planned-missions";

  return (
    <div className="flex flex-col">
      <label className="text-sm text-[var(--text)]">Route</label>
      <select
        value={mission.route || ""}
        onChange={(e) =>
          setMission({
            ...mission,
            route: e.target.value ? (e.target.value as any) : "",
          })
        }
        className="px-2 py-1 h-12 border-2 border-[var(--accent)] rounded shadow bg-[var(--secondary)]"
      >
        {isPlanned && <option value="">None</option>}
        {ROUTES.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RouteSelector;
