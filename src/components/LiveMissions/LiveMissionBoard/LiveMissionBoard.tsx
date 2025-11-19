import React from "react";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import type { Mission, MissionStatus } from "../../../types/mission";
import MissionColumn from "../MissionColumn/MissionColumn";
import MissionCard from "../MissionCard/MissionCard";

interface Props {
  missions: Mission[];
  activeMission: Mission | null;
  setActiveMission: (m: Mission | null) => void;
  onUpdateMission: (m: Mission) => void;
  onDragEnd: (activeId: string, targetStatus: MissionStatus) => void; // <-- fix here
  columns: MissionStatus[]; // also update columns type for consistency
}


const LiveMissionBoard: React.FC<Props> = ({
  missions,
  activeMission,
  setActiveMission,
  onUpdateMission,
  onDragEnd,
  columns,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveMission(missions.find((m) => m.id === e.active.id) || null)}
      onDragEnd={(e) => {
        if (!e.over) return setActiveMission(null);
        onDragEnd(e.active.id as string, e.over.id as MissionStatus);
      }}
    >
      <div className="flex gap-6">
        {columns.map((col) => (
          <MissionColumn
            key={col}
            status={col}
            missions={missions.filter((m) => m.status === col && m.id !== activeMission?.id)}
            onUpdateMission={onUpdateMission}
          />
        ))}
      </div>

      <DragOverlay>
        {activeMission && <MissionCard mission={activeMission} onUpdate={onUpdateMission} />}
      </DragOverlay>
    </DndContext>
  );
};

export default LiveMissionBoard;
