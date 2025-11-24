import React from "react";
import { SECTIONS } from "../../../../../types/section";
import { SECTION_IMAGES } from "../../../../../constants/sections";
import type { Mission } from "../../../../../types/mission";

interface Props {
  mission: Mission;
  selected: string;
  setMission: (updated: Mission) => void;
}

const SectionCarousel: React.FC<Props> = ({ mission, selected, setMission }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-[var(--text)]">Section</label>

      <div className="flex gap-4 overflow-x-auto py-3 px-2">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setMission({ ...mission, section: s })}
            className={`flex flex-col items-center border-2 rounded-lg border-[var(--accent)] min-w-[150px] overflow-hidden transition hover:scale-105 ${
              selected === s ? "ring-4 ring-[var(--accent)]" : ""
            }`}
          >
            <img src={SECTION_IMAGES[s]} className="w-40 h-24 object-cover" />
            <div className="text-center text-sm font-semibold mt-1">{s}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionCarousel;
