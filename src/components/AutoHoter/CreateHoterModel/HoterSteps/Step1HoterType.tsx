// src/components/AutoHoter/CreateHoterModal/HoterSteps/Step1Type.tsx
import React from "react";
import type { Hoter, HoterType } from "../../../../types/hoter";

interface Props {
  formData: Partial<Hoter>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Hoter>>>;
}

const Step1Type: React.FC<Props> = ({ formData, setFormData }) => {
  const types: HoterType[] = ["crawler", "pandemic"];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Select Hoter Type</h3>
      <div className="flex gap-4">
        {types.map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded border-2 border-[var(--accent)]  ${
              formData.type === t ? "bg-[var(--accent)] text-white" : "bg-[var(--background)] text-[var(--text)]"
            }`}
            onClick={() => setFormData({ ...formData, type: t })}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1Type;
