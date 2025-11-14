// src/components/AutoHoter/CreateHoterModal/HoterSteps/Step3Section.tsx
import React from "react";
import type{ Hoter, Section } from "../../../../types/hoter";

interface Props {
  formData: Partial<Hoter>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Hoter>>>;
}

const allSections: Section[] = ["110","130","140","150","160","161","170","180","190"];

const Step3Section: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Select Hoter Section</h3>
      <div className="flex flex-wrap gap-2">
        {allSections.map((s) => (
          <button
            key={s}
            className={`px-3 py-1 rounded border border-[var(--accent)] ${
              formData.section === s ? "bg-[var(--accent)] text-white" : "bg-[var(--background)] text-[var(--text)]"
            }`}
            onClick={() => setFormData({ ...formData, section: s })}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step3Section;
