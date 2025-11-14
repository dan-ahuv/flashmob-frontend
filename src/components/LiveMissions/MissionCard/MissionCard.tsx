import React, { useState } from "react";
import type { Mission } from "../../../types/mission";
import EditMissionPopup from "../EditMissionPopup/EditMissionPopup";

interface Props {
  mission: Mission;
  onUpdate: (updated: Mission) => void;
  dragListeners?: any; // optional, used for drag
}

const sectionColors: Record<string, string> = {
  "130": "bg-red-400",
  "140": "bg-green-400",
  "110": "bg-blue-400",
  "150": "bg-yellow-400",
};

const statusColors: Record<string, string> = {
  "planned-missions": "bg-gray-300 text-gray-800",
  "active-missions": "bg-blue-300 text-blue-800",
  "completed-missions": "bg-green-300 text-green-800",
};

const MissionCard: React.FC<Props> = ({ mission, onUpdate, dragListeners }) => {
  const [editOpen, setEditOpen] = useState(false);

  const startTime = mission.time?.start
    ? new Date(mission.time.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const endTime = mission.time?.end
    ? new Date(mission.time.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const startDate = mission.time?.start
    ? new Date(mission.time.start).toLocaleDateString()
    : "--/--/----";

  return (
    <>
      <div className="relative flex bg-[var(--background)] rounded-lg shadow p-4 mb-3 group border-2 border-[var(--accent)]">
        {/* Drag handle area */}
        <div {...dragListeners} className="flex-1 flex flex-col gap-1 cursor-grab">
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

          <div className={`inline-block px-2 py-1 rounded text-xs mt-1 ${statusColors[mission.status]}`}>
            {mission.status?.replace("-", " ") || "Unknown"}
          </div>
        </div>

        {/* Section rectangle */}
        <div
          className={`absolute top-2 bottom-2 right-2 w-12 h-6 rounded-lg ${
            sectionColors[mission.section] || "bg-gray-400"
          } transition-opacity group-hover:opacity-50`}
        ></div>

        {/* Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition z-20 pointer-events-auto">
          <button
            className="bg-[var(--background)] text-[var(--text)] px-2 py-1 rounded text-xs hover:opacity-80 border-2 border-[var(--accent)]"
            onClick={(e) => { e.stopPropagation(); setEditOpen(true); }}
          >
            Edit Mission
          </button>
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

      {/* Edit Mission Popup */}
      {editOpen && (
        <EditMissionPopup
          mission={mission}
          onClose={() => setEditOpen(false)}
          onSave={(updated) => onUpdate(updated)} // centralized save
        />
      )}
    </>
  );
};

export default MissionCard;
