import React from "react";
import { useDroppable } from "@dnd-kit/core";
import MissionCard from "../MissionCard/MissionCard";
import type { Mission, MissionStatus } from "../../../types/mission";

interface Props {
  status: MissionStatus;
  missions: Mission[];
  onUpdateMission: (updated: Mission) => void;
}

const MissionColumn: React.FC<Props> = ({ status, missions, onUpdateMission }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 flex flex-col rounded-lg transition-colors ${
        isOver ? "bg-[var(--accent)]" : "bg-[var(--secondary)]"
      }`}
      style={{
        minHeight: "calc(100vh - 200px)",
        maxHeight: "calc(100vh - 200px)",
      }}
    >
      {/* Column header */}
      <h2 className="font-bold mb-4 p-4">{status.replace("-", " ")}</h2>

      {/* Scrollable cards container */}
      <div className="flex-1 overflow-y-auto px-4 pb-4" style={{ pointerEvents: "auto" }}>
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onUpdate={onUpdateMission}
            sortable={true} // now each card handles its own sortable behavior
          />
        ))}
      </div>
    </div>
  );
};

export default MissionColumn;
