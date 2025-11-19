import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditMissionPopup from "../EditMissionPopup/EditMissionPopup";
import type { Mission } from "../../../types/mission";
import type { Section } from "../../../types/section";
import { SECTION_IMAGES } from "../../../constants/sections";
import { MISSION_STATUS_COLORS } from "../../../constants/liveMission";

interface Props {
  mission: Mission;
  onUpdate: (updated: Mission) => void;
  sortable?: boolean; // enable drag if true
}

const MissionCard: React.FC<Props> = ({ mission, onUpdate, sortable = false }) => {
  const [editOpen, setEditOpen] = useState(false);

  // DnD-kit sortable
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: mission.id });

  const style: React.CSSProperties = sortable
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : "auto",
      }
    : {};

  const startTime = mission.time?.start
    ? new Date(mission.time.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const endTime = mission.time?.end
    ? new Date(mission.time.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const startDate = mission.time?.start
    ? new Date(mission.time.start).toLocaleDateString()
    : "--/--/----";

  const cardContent = (
    <div className="relative flex bg-[var(--background)] rounded-lg shadow p-4 mb-3 group border-2 border-[var(--accent)]">
      {/* Drag handle area */}
      <div {...(sortable ? listeners : {})} className="flex-1 flex flex-col gap-1 cursor-grab">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg text-[var(--text)]">{mission.name}</h3>
          <h3 className="font-bold text-lg text-[var(--faded-text)]">
            {mission.platforms?.length || 0}P
          </h3>
        </div>

        <div className="flex gap-2 text-sm text-[var(--faded-text)]">
          <span>Station: {mission.station || "-"}</span>
          <span>Route: {mission.route || "-"}</span>
        </div>

        <div className="text-sm text-[var(--faded-text)]">
          {startDate} | {startTime} - {endTime}
        </div>

        <div
          className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
            MISSION_STATUS_COLORS[mission.status]
          }`}
        >
          {mission.status?.replace("-", " ") || "Unknown"}
        </div>
      </div>

      {/* Section image */}
      <img
        src={SECTION_IMAGES[mission.section as Section] || "/sections/default-section.png"}
        alt={`Section ${mission.section}`}
        className="absolute top-2 bottom-2 right-2 w-12 h-6 rounded-lg object-cover transition-opacity group-hover:opacity-50"
      />

      {/* Buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition z-20 pointer-events-auto">
        {mission.status !== "completed-missions" && (
          <button
            className="bg-[var(--background)] text-[var(--text)] px-2 py-1 rounded text-xs hover:opacity-80 border-2 border-[var(--accent)]"
            onClick={(e) => { e.stopPropagation(); setEditOpen(true); }}
          >
            Edit Mission
          </button>
        )}
        <button
          className="bg-[var(--background)] text-[var(--text)] px-2 py-1 rounded text-xs hover:opacity-80 border-2 border-[var(--accent)]"
          onClick={(e) => { e.stopPropagation(); alert("Report pressed"); }}
        >
          Report Problem
        </button>
        <button
          className="bg-[var(--background)] text-[var(--text)] px-2 py-1 rounded text-xs hover:opacity-80 border-2 border-[var(--accent)]"
          onClick={(e) => { e.stopPropagation(); alert("Auto PreFlight pressed"); }}
        >
          Auto PreFlight
        </button>
      </div>
    </div>
  );

  return (
    <>
      {sortable ? (
        <div ref={setNodeRef} style={style} {...attributes}>
          {cardContent}
        </div>
      ) : (
        cardContent
      )}

      {editOpen && (
        <EditMissionPopup
          mission={mission}
          onClose={() => setEditOpen(false)}
          onSave={(updated) => onUpdate(updated)}
        />
      )}
    </>
  );
};

export default MissionCard;
