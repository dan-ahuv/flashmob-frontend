// src/components/AutoHoter/CreateHoterModal/HoterSteps/Step4Sagahs.tsx
import React from "react";
import type { Hoter, Sagah } from "../../../../types/hoter";

interface Props {
  formData: Partial<Hoter>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Hoter>>>;
}

const allSagahs: Sagah[] = ["A", "B", "C", "D", "E"];

const Step4Sagahs: React.FC<Props> = ({ formData, setFormData }) => {
  const toggleSagah = (sagah: Sagah) => {
    const sagahs = formData.sagahs || [];
    if (sagahs.includes(sagah)) {
      setFormData({ ...formData, sagahs: sagahs.filter((s) => s !== sagah) });
    } else {
      setFormData({ ...formData, sagahs: [...sagahs, sagah] });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Select Hoter Sagahs</h3>
      <div className="flex gap-2 flex-wrap">
        {allSagahs.map((s) => (
          <button
            key={s}
            className={`px-3 py-1 rounded border border-[var(--accent)] ${
              formData.sagahs?.includes(s) ? "bg-[var(--accent)] text-white" : "bg-[var(--background)] text-[var(--text)]"
            }`}
            onClick={() => toggleSagah(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step4Sagahs;
