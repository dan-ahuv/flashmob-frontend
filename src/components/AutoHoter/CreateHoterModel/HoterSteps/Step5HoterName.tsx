// src/components/AutoHoter/CreateHoterModal/HoterSteps/Step5Name.tsx
import React from "react";
import type { Hoter } from "../../../../types/hoter";

interface Props {
  formData: Partial<Hoter>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Hoter>>>;
}

const Step5Name: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Hoter Name</h3>
      <input
        type="text"
        className="w-full border rounded p-2"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter hoter name"
      />
    </div>
  );
};

export default Step5Name;
