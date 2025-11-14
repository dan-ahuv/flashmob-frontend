import React from "react";
import type { Mission } from "../../../../../types/mission";
import { SECTIONS, type Section } from "../../../../../types/section";
import SpaceFiller from "../../../../../assets/SectionPics/Red_flag.svg.png";

interface Props {
  formData: Partial<Mission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Mission>>>;
}

const sectionImages: Record<Section, string> = {
  "110": SpaceFiller,
  "130": SpaceFiller,
  "140": SpaceFiller,
  "150": SpaceFiller,
  "160": SpaceFiller,
  "161": SpaceFiller,
  "170": SpaceFiller,
  "180": SpaceFiller,
  "190": SpaceFiller,
};

const SectionSelector: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div>
      <p className="mb-2">Select Section *</p>
      <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 px-4">
        {SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, section: s }))}
            className={`flex flex-col items-center border-2 rounded-lg border-[var(--accent)] overflow-hidden min-w-[200px] transition transform hover:scale-105 ${
              formData.section === s ? "ring-4 ring-[var(--accent)]" : ""
            }`}
          >
            <img
              src={sectionImages[s]}
              alt={s}
              className="w-50 h-30 object-cover"
            />
            <div className="text-center text-sm font-semibold mt-1">{s}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionSelector;
