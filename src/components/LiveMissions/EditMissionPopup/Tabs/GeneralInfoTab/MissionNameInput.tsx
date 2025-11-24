import React from "react";
import type { Mission } from "../../../../../types/mission";

interface Props {
  name: string;
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const MissionNameInput: React.FC<Props> = ({ name, mission, setMission }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-[var(--text)]">Mission name</label>
      <input
        type="text"
        value={name}
        placeholder="Mission Name"
        className="w-100 px-2 py-1 h-12 border-2 border-[var(--accent)] rounded shadow bg-[var(--secondary)]"
        onChange={(e) => setMission({ ...mission, name: e.target.value })}
      />
    </div>
  );
};

export default MissionNameInput;
