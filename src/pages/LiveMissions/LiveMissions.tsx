import React, { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";

import MissionColumn from "../../components/LiveMissions/MissionColumn/MissionColumn";
import SortableMissionCard from "../../components/LiveMissions/MissionCard/SortableMissionCard";
import CreateMissionButton from "../../components/LiveMissions/CreateMissionButton/CreateMissionButton";
import CreateMissionModal from "../../components/LiveMissions/CreateMissionModel/CreateMissionModel";

import type { Mission, MissionStatus } from "../../types/mission";

const initialMissions: Mission[] = [
  {
    id: "1",
    name: "Mission Alpha",
    station: "3",
    route: "dirty-dance-a",
    section: "150",
    platforms: [],
    technicians: [],
    matzats: [],
    mamashs: [],
    time: { start: "2025-10-03T09:00:00Z", end: "2025-10-03T12:00:00Z" },
    status: "planned-missions",
  },
  {
    id: "2",
    name: "Mission Beta",
    station: "4",
    route: "dirty-dance-b",
    section: "140",
    platforms: [],
    technicians: [],
    matzats: [],
    mamashs: [],
    time: { start: "2025-10-03T13:00:00Z", end: "2025-10-03T16:00:00Z" },
    status: "active-missions",
  },
];

const columns: MissionStatus[] = ["planned-missions", "active-missions", "completed-missions"];

const LiveMissions: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: any) => {
    const mission = missions.find((m) => m.id === event.active.id) || null;
    setActiveMission(mission);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !columns.includes(over.id as MissionStatus)) {
      setActiveMission(null);
      return;
    }

    const targetStatus = over.id as MissionStatus;

    setMissions((prev) =>
      prev.map((m) => (m.id === active.id ? { ...m, status: targetStatus } : m))
    );

    setActiveMission(null);
  };

  const handleCreateMissionClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddMission = (newMission: Mission) => {
    setMissions((prev) => [...prev, newMission]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Title + Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">Live Missions</h1>
        <CreateMissionButton onClick={handleCreateMissionClick} />
      </div>

      {/* Kanban */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-6">
          {columns.map((col) => (
            <MissionColumn
              key={col}
              status={col}
              missions={missions.filter((m) => m.status === col)}
              onUpdateMission={(updated) =>
                setMissions((prev) =>
                  prev.map((m) => (m.id === updated.id ? updated : m))
                )
              }
            />
          ))}
        </div>

        {/* Drag overlay */}
        <DragOverlay>
          {activeMission && (
            <SortableMissionCard
              mission={activeMission}
              onUpdate={(updated) =>
                setMissions((prev) =>
                  prev.map((m) => (m.id === updated.id ? updated : m))
                )
              }
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Create Mission Modal */}
      <CreateMissionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddMission}
      />
    </div>
  );
};

export default LiveMissions;
