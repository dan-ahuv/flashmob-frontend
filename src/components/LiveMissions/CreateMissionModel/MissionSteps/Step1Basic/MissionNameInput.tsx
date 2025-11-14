import React from "react";
import type { Mission } from "../../../../../types/mission";

interface Props {
  formData: Partial<Mission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Mission>>>;
}

const MissionNameInput: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <label className="flex flex-col gap-1">
      Mission Name *
      <input
        type="text"
        value={formData.name || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        className="w-100 p-3 border-2 border-[var(--accent)] rounded shadow focus:ring-2 focus:[var(--accent)] bg-[var(--secondary)]"
      />
    </label>
  );
};

export default MissionNameInput;
